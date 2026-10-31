import { $, $$, esc, icon, state, saveState, updateSettings, applySettings, toast, loadLibrary, loadBook, allBooks, allSources, normalizeSources, saveCustomSources, clearCustomSources, getCustomSources, isOnShelf, toggleShelf, cover, bookCard, sourceSearchUrl, searchOnlineBooks, fullTextSearch, highlight, formatWords, domainOf, timeAgo } from './core.js';
import { mountReader, cleanupReader } from './reader.js';

const root = $('#app');
const onlineCache = new Map();
let routeVersion = 0;
applySettings();

const navItems = [
  ['home', '#/home', 'home', '书桌'],
  ['search', '#/search', 'search', '找书'],
  ['sources', '#/sources', 'sources', '书源'],
  ['profile', '#/profile', 'user', '我的'],
];
function navHTML(active, mobile = false) {
  return navItems.map(([id, href, ico, label]) => `<a class="nav-link${active === id ? ' active' : ''}" href="${href}">${icon(ico)}<span>${label}</span></a>`).join('');
}
function shell(content, active) {
  cleanupReader();
  root.innerHTML = `<div class="app-shell"><aside class="sidebar"><a class="brand" href="#/home"><span class="brand-mark">书</span><div><div class="brand-name">书桌</div><span class="brand-sub">DESK LIBRARY</span></div></a><nav class="nav">${navHTML(active)}</nav><div class="sidebar-note"><strong>把阅读留给阅读</strong>书籍、书源与记录保存在你的浏览器中。</div></aside>
    <main class="main"><div class="mobile-head"><a class="brand" href="#/home"><span class="brand-mark">书</span><div><div class="brand-name">书桌</div></div></a><a class="btn ghost" href="#/search">${icon('search')}找书</a></div>${content}</main></div>
    <nav class="mobile-nav">${navHTML(active, true)}</nav>`;
}
function pageHead(eyebrow, title, desc = '', action = '') {
  return `<div class="page-head"><div><div class="eyebrow">${esc(eyebrow)}</div><h1 class="page-title">${esc(title)}</h1>${desc ? `<p class="page-desc">${esc(desc)}</p>` : ''}</div>${action}</div>`;
}
function searchForm(value = '', mode = 'books') {
  return `<form class="hero-search" id="global-search"><input name="q" value="${esc(value)}" placeholder="搜索书名、作者，或书里的句子" autocomplete="off" aria-label="搜索书籍"><input type="hidden" name="mode" value="${esc(mode)}"><button type="submit">搜索</button></form>`;
}

async function renderHome(version) {
  const books = await allBooks();
  if (version !== routeVersion) return;
  const library = await loadLibrary();
  const localBook = library.books[0];
  const byId = new Map(books.map(book => [book.id, book]));
  const shelf = state.shelf.map(id => byId.get(id)).filter(Boolean);
  const recent = Object.entries(state.progress).sort((a, b) => String(b[1].updatedAt).localeCompare(String(a[1].updatedAt)))[0];
  const recentBook = recent ? byId.get(recent[0]) : null;
  const featured = recentBook || localBook;
  const progress = state.progress[featured.id];
  const seconds = Object.values(state.progress).reduce((sum, item) => sum + (item.seconds || 0), 0);
  const continueHref = `#/read/${encodeURIComponent(featured.id)}/${encodeURIComponent(progress?.chapter || 'preface')}`;
  const content = `<div class="page">${pageHead('YOUR QUIET CORNER', '今天，读点什么？', `${shelf.length} 本藏书 · ${library.sourceCount.toLocaleString()} 条书源 · 记录只留在本机`, `<a class="btn" href="#/profile">${icon('clock')}阅读记录</a>`)}
    ${searchForm()}
    <section class="continue-card"><a href="#/book/${encodeURIComponent(featured.id)}">${cover(featured, true)}</a><div class="continue-info"><div class="continue-label">${progress ? '继续阅读' : '从你的书架开始'}</div><h2 class="continue-title">${esc(featured.title)}</h2><div class="continue-meta">${esc(featured.author)}${progress ? ` · 已读 ${Math.round(progress.percent || 0)}% · ${timeAgo(progress.updatedAt)}` : ` · ${formatWords(featured.words)} · ${featured.chapterCount} 章`}</div><div class="progress-line"><span style="width:${progress?.percent || 0}%"></span></div></div><div class="continue-action"><a class="btn primary" href="${continueHref}">${progress ? '继续阅读' : '开始阅读'}${icon('arrow')}</a></div></section>
    <div class="section-head"><h2 class="section-title">我的书架</h2><a class="section-link" href="#/search">去找一本新书${icon('arrow')}</a></div>
    ${shelf.length ? `<div class="book-grid">${shelf.map(book => bookCard(book)).join('')}</div>` : `<div class="empty"><div class="empty-title">书架还空着</div><p>去找书页搜索书名，把感兴趣的书放进来。</p></div>`}
    <div class="section-head"><h2 class="section-title">阅读小记</h2></div><div class="stats-grid"><div class="stat-card"><div class="stat-value">${Math.floor(seconds / 60)}</div><div class="stat-label">累计阅读分钟</div></div><div class="stat-card"><div class="stat-value">${state.bookmarks.length}</div><div class="stat-label">章节书签</div></div><div class="stat-card"><div class="stat-value">${Object.keys(state.progress).length}</div><div class="stat-label">读过的书</div></div></div>
    <div class="footnote">个人学习收藏，请支持正版。在线书籍信息来自公开书籍服务。</div></div>`;
  shell(content, 'home');
}

async function renderSearch(version, params) {
  const query = (params.get('q') || '').trim();
  const mode = params.get('mode') === 'fulltext' ? 'fulltext' : 'books';
  const content = `<div class="page"><div class="search-page-head">${pageHead('DISCOVER', '找书', '搜书名与作者，也可以翻到书里找一句话')}${searchForm(query, mode)}<div class="search-tabs"><a class="search-tab${mode === 'books' ? ' active' : ''}" href="#/search?q=${encodeURIComponent(query)}&mode=books">书籍与在线书库</a><a class="search-tab${mode === 'fulltext' ? ' active' : ''}" href="#/search?q=${encodeURIComponent(query)}&mode=fulltext">《以日为鉴》全文</a></div></div><div id="search-content">${query ? '<div class="search-status"><span class="spinner"></span>正在检索…</div>' : `<div class="empty">${icon('search')}<div class="empty-title">从一个书名或一句话开始</div><p>本地搜索即时完成；在线找书需要连接公开书籍服务。<br>想找网文时，也可以到书源中心选择常用源站。</p></div>`}</div></div>`;
  shell(content, 'search');
  if (!query) return;

  if (mode === 'fulltext') {
    const book = await loadBook('yiriweijian');
    if (version !== routeVersion) return;
    const results = fullTextSearch(book, query);
    $('#search-content').innerHTML = `<div class="search-status">在《${esc(book.title)}》中找到 ${results.length}${results.length === 40 ? '+' : ''} 处相关内容</div>${results.length ? `<div class="result-list">${results.map(result => `<a class="text-result" href="#/read/${book.id}/${encodeURIComponent(result.chapter.id)}?q=${encodeURIComponent(query)}"><div class="text-result-chapter">${esc(result.chapter.title)}</div><div class="text-result-snippet">${esc(result.prefix)}${highlight(result.text, query)}${esc(result.suffix)}</div></a>`).join('')}</div>` : emptyBlock('没有找到这句话', '试试缩短关键词，或回到书籍搜索。')}`;
    return;
  }

  const books = await allBooks();
  const lower = query.toLowerCase();
  const local = books.filter(book => `${book.title} ${book.author} ${book.desc || ''}`.toLowerCase().includes(lower));
  if (version !== routeVersion) return;
  $('#search-content').innerHTML = `<div class="section-head" style="margin-top:0"><h2 class="section-title">我的书库</h2><span class="small muted">${local.length} 个结果</span></div>${local.length ? `<div class="result-list">${local.map(book => resultCard(book, true)).join('')}</div>` : emptyBlock('本机书架没有匹配结果', '已继续帮你查询在线公开书库。')}<div class="section-head"><h2 class="section-title">在线书库</h2><a class="section-link" href="#/sources?q=${encodeURIComponent(query)}">改用小说书源查找${icon('arrow')}</a></div><div id="online-results"><div class="search-status"><span class="spinner"></span>正在连接 Google Books 与 Open Library…</div></div>`;
  try {
    const { books: online, errors } = await searchOnlineBooks(query);
    if (version !== routeVersion) return;
    online.forEach(book => onlineCache.set(book.id, book));
    const target = $('#online-results');
    if (!target) return;
    target.innerHTML = online.length ? `<div class="result-list">${online.map(book => resultCard(book, false)).join('')}</div>` : emptyBlock('在线书库没有找到', errors.length ? '公开书籍服务暂时无法访问，请稍后重试，或改用下方书源站查找。' : '换一个书名或作者试试。');
    if (errors.length && online.length) target.insertAdjacentHTML('beforeend', `<div class="notice">${icon('sources')}部分在线书库连接失败，已展示能够取得的结果；不影响本地书籍与阅读。</div>`);
  } catch (error) {
    if (version === routeVersion && $('#online-results')) $('#online-results').innerHTML = emptyBlock('在线搜索暂时不可用', '请检查网络，或到书源中心从源站搜索。');
  }
}

function resultCard(book, local) {
  const onShelf = isOnShelf(book.id);
  const safeUrl = /^https?:\/\//i.test(book.url || '') ? book.url : '';
  return `<article class="result-card"><a href="${local ? `#/book/${encodeURIComponent(book.id)}` : esc(safeUrl)}" ${local ? '' : 'target="_blank" rel="noopener noreferrer"'}>${cover(book, true)}</a><div class="result-main"><h3 class="result-title">${esc(book.title)}</h3><div class="result-meta">${esc(book.author || '佚名')}${book.published ? ` · ${esc(book.published)}` : ''}${book.publisher ? ` · ${esc(book.publisher)}` : ''}</div><div class="result-desc">${esc(book.desc || '暂无简介')}</div><div class="result-actions">${local ? `<a class="btn primary" href="#/book/${encodeURIComponent(book.id)}">查看与阅读${icon('arrow')}</a>` : `<button class="btn${onShelf ? '' : ' primary'}" data-action="toggle-shelf" data-book-id="${esc(book.id)}">${icon(onShelf ? 'check' : 'plus')}${onShelf ? '已在书架' : '加入书架'}</button><a class="btn" href="#/sources?q=${encodeURIComponent(book.title)}">查找可读源</a>${safeUrl ? `<a class="btn ghost" href="${esc(safeUrl)}" target="_blank" rel="noopener noreferrer" title="查看书籍信息">${icon('external')}</a>` : ''}<span class="result-source">${esc(book.source || '本机藏书')}</span></div></div></article>`}`;
}

async function renderBook(version, id) {
  const book = await loadBook(id);
  if (version !== routeVersion) return;
  const progress = state.progress[id];
  const currentChapter = progress?.chapter || book.chapters[0].id;
  const content = `<div class="page">${pageHead('BOOK DETAIL', '书籍详情', '', `<a class="btn" href="#/search?q=${encodeURIComponent(book.title)}&mode=fulltext">${icon('search')}书内搜索</a>`)}
    <section class="detail-hero"><div>${cover(book)}</div><div><h2 class="detail-title">${esc(book.title)}</h2><div class="detail-author">${esc(book.author)} 著</div><div class="detail-meta"><span class="pill green">${esc(book.category)}</span><span class="pill">${esc(book.published)}</span><span class="pill">${formatWords(book.words)}</span><span class="pill">${book.chapterCount} 章</span></div><div class="btn-row"><a class="btn primary" href="#/read/${encodeURIComponent(id)}/${encodeURIComponent(currentChapter)}">${icon('book')}${progress ? '继续阅读' : '开始阅读'}</a><a class="btn" href="${esc(book.pdf)}" download>${icon('download')}原版 PDF</a><button class="btn" data-action="toggle-shelf" data-book-id="${esc(id)}">${icon(isOnShelf(id) ? 'check' : 'plus')}${isOnShelf(id) ? '已在书架' : '加入书架'}</button></div></div><p class="detail-desc">${esc(book.desc)}</p></section>
    <div class="section-head"><h2 class="section-title">目录</h2><span class="small muted">ISBN ${esc(book.isbn)}</span></div><div class="toc-list">${book.chapters.map((chapter, index) => `${index === 0 || chapter.part !== book.chapters[index - 1].part ? (chapter.part ? `<div class="toc-part">${esc(chapter.part)}</div>` : '') : ''}<a class="toc-item" href="#/read/${encodeURIComponent(id)}/${encodeURIComponent(chapter.id)}"><span class="toc-index">${String(index + 1).padStart(2, '0')}</span><span>${esc(chapter.title)}</span>${icon('right')}</a>`).join('')}</div></div>`;
  shell(content, 'home');
}

async function renderSources(version, params) {
  const initialQuery = (params.get('q') || '').trim();
  const custom = getCustomSources();
  const sources = await allSources();
  if (version !== routeVersion) return;
  const groups = [...new Set(sources.map(source => source.g).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
  const content = `<div class="page">${pageHead('BOOK SOURCES', '书源中心', `${sources.length.toLocaleString()} 条可用书源，选择源站查找网络书籍`, `<button class="btn" id="import-trigger">${icon('upload')}导入书源</button>`)}
    <div class="notice">${icon('sources')}GitHub Pages 不能代替 Legado 执行全部书源规则。这里会生成源站搜索链接；源站是否可免费阅读，以其页面实际内容为准。</div>
    <div class="source-toolbar"><div class="field">${icon('search')}<input class="input" id="source-filter" placeholder="筛选书源名称或域名" value="" aria-label="筛选书源"></div><select class="select" id="source-group"><option value="">全部分组</option>${groups.map(group => `<option value="${esc(group)}">${esc(group)}</option>`).join('')}</select><button class="btn" id="favorite-only">${icon('bookmark')}只看常用</button></div>
    <div class="import-box">${icon('upload')}<div class="import-text"><div class="import-title">${custom ? '正在使用你导入的书源' : '导入 Legado 书源 JSON'}</div><div class="import-desc">${custom ? `导入于 ${timeAgo(custom.importedAt)}，共 ${custom.sources.length.toLocaleString()} 条。书源只保存到当前浏览器。` : '支持阅读 App 导出的书源数组；网站只提取名称、分组、源站和搜索地址。'}</div></div>${custom ? '<button class="btn" id="restore-sources">恢复内置书源</button>' : '<button class="btn" id="import-trigger-secondary">选择 JSON 文件</button>'}<input type="file" id="source-file" accept=".json,application/json"></div>
    <div class="source-summary"><span id="source-count"></span><span>搜索词：<strong id="source-keyword">${esc(initialQuery || '未填写')}</strong></span></div><div id="source-list" class="source-list"></div><div id="source-more" class="footnote"></div></div>`;
  shell(content, 'sources');
  const filter = $('#source-filter');
  const group = $('#source-group');
  let favoriteOnly = false;
  let visibleSources = [];

  function updateList() {
    const needle = filter.value.trim().toLowerCase();
    const filtered = sources.filter(source => {
      const id = String(sources.indexOf(source));
      return (!needle || `${source.n} ${source.u} ${source.g}`.toLowerCase().includes(needle))
        && (!group.value || source.g === group.value)
        && (!favoriteOnly || state.favoriteSources.includes(id));
    });
    visibleSources = filtered.slice(0, 80);
    $('#source-count').textContent = `匹配 ${filtered.length.toLocaleString()} 条${filtered.length > 80 ? '，显示前 80 条' : ''}`;
    $('#source-list').innerHTML = visibleSources.length ? visibleSources.map(source => sourceCard(source, sources.indexOf(source), initialQuery)).join('') : emptyBlock('没有匹配的书源', favoriteOnly ? '先把书源加入常用，或取消“只看常用”。' : '换一个名称、域名或分组试试。');
    $('#source-more').textContent = filtered.length > 80 ? '继续缩小筛选范围可查看其余书源。' : '书源名称与规则归原整理者所有。';
  }
  filter.addEventListener('input', updateList);
  group.addEventListener('change', updateList);
  $('#favorite-only').addEventListener('click', event => {
    favoriteOnly = !favoriteOnly;
    event.currentTarget.classList.toggle('primary', favoriteOnly);
    updateList();
  });
  const triggerImport = () => $('#source-file').click();
  $('#import-trigger').addEventListener('click', triggerImport);
  $('#import-trigger-secondary')?.addEventListener('click', triggerImport);
  $('#restore-sources')?.addEventListener('click', () => {
    clearCustomSources();
    toast('已恢复内置书源');
    renderSources(routeVersion, params);
  });
  $('#source-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const raw = JSON.parse(await file.text());
      const normalized = normalizeSources(raw);
      if (!normalized.length) throw new Error('没有可用的书源');
      saveCustomSources(normalized);
      toast(`已导入 ${normalized.length.toLocaleString()} 条书源`);
      renderSources(routeVersion, params);
    } catch (error) { toast(`导入失败：${error.message}`); }
  });
  updateList();
}

function sourceCard(source, id, keyword) {
  const favorite = state.favoriteSources.includes(String(id));
  const url = sourceSearchUrl(source, keyword);
  return `<article class="source-card"><div class="source-top"><div style="min-width:0"><div class="source-name">${esc(source.n)}</div><div class="source-domain">${esc(domainOf(source.u) || source.u)}</div></div><button class="favorite-btn${favorite ? ' active' : ''}" data-action="favorite-source" data-source-id="${id}" title="${favorite ? '移出常用' : '加入常用'}">${icon('bookmark')}</button></div><div class="source-bottom"><span class="pill">${esc(source.g || '未分组')}</span><a class="btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${icon('external')}${keyword ? '用它找书' : '打开源站'}</a></div></article>`;
}

async function renderProfile(version) {
  const books = await allBooks();
  if (version !== routeVersion) return;
  const byId = new Map(books.map(book => [book.id, book]));
  const seconds = Object.values(state.progress).reduce((sum, item) => sum + (item.seconds || 0), 0);
  const online = state.onlineBooks;
  const content = `<div class="page">${pageHead('YOUR READING', '我的阅读', '书架、进度和偏好均保存在当前浏览器，不会上传账号数据')}
    <div class="stats-grid"><div class="stat-card"><div class="stat-value">${state.shelf.length}</div><div class="stat-label">书架藏书</div></div><div class="stat-card"><div class="stat-value">${Math.floor(seconds / 60)}</div><div class="stat-label">阅读分钟</div></div><div class="stat-card"><div class="stat-value">${state.bookmarks.length}</div><div class="stat-label">章节书签</div></div></div>
    <div class="profile-grid"><section class="panel"><h2 class="panel-title">我的书签</h2>${state.bookmarks.length ? state.bookmarks.map(item => `<a class="bookmark-item" href="#/read/${encodeURIComponent(item.bookId)}/${encodeURIComponent(item.chapter)}">${icon('bookmark')}<span class="bookmark-title">${esc(item.title)}<span class="muted"> · ${esc(item.bookTitle)}</span></span><span class="bookmark-date">${timeAgo(item.createdAt)}</span></a>`).join('') : '<div class="empty" style="padding:30px 18px"><div class="empty-title">还没有书签</div><p>阅读时点击顶部书签按钮，就能在这里快速回到某一章。</p></div>'}</section>
    <section class="panel"><h2 class="panel-title">阅读偏好</h2><div class="setting-row"><span>阅读背景</span><select class="select" id="profile-theme">${[['light','浅色'],['sepia','护眼'],['dark','夜间']].map(([value,label]) => `<option value="${value}"${state.settings.theme === value ? ' selected' : ''}>${label}</option>`).join('')}</select></div><div class="setting-row"><span>正文字号</span><strong>${state.settings.fontSize}px</strong></div><div class="setting-row"><span>正文行距</span><strong>${state.settings.lineHeight.toFixed(1)}</strong></div><div class="data-actions"><button class="btn" id="clear-progress">${icon('trash')}清空阅读进度与书签</button>${getCustomSources() ? '<button class="btn" id="clear-sources">恢复内置书源</button>' : ''}</div></section></div>
    ${online.length ? `<div class="section-head"><h2 class="section-title">在线收藏</h2><span class="small muted">${online.length} 本</span></div><div class="book-grid">${online.map(book => bookCard(book, { add: true })).join('')}</div>` : ''}
    <div class="footnote">清除浏览器站点数据会同时清除书架与阅读记录。书籍正文与原版 PDF 仅用于个人学习收藏。</div></div>`;
  shell(content, 'profile');
  $('#profile-theme').addEventListener('change', event => { updateSettings({ theme: event.target.value }); toast('阅读背景已更新'); });
  $('#clear-progress').addEventListener('click', () => {
    if (!window.confirm('确定清空全部阅读进度、时长和书签吗？书架会保留。')) return;
    saveState({ progress: {}, bookmarks: [] });
    toast('阅读记录已清空');
    renderProfile(routeVersion);
  });
  $('#clear-sources')?.addEventListener('click', () => { clearCustomSources(); toast('已恢复内置书源'); renderProfile(routeVersion); });
}

function emptyBlock(title, desc) {
  return `<div class="empty">${icon('book')}<div class="empty-title">${esc(title)}</div><p>${esc(desc)}</p></div>`;
}

async function route() {
  const version = ++routeVersion;
  const raw = location.hash.replace(/^#\/?/, '') || 'home';
  const [path, queryString = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const params = new URLSearchParams(queryString);
  cleanupReader();
  window.scrollTo(0, 0);
  try {
    if (parts[0] === 'read' && parts[1] && parts[2]) {
      await mountReader(root, parts[1], parts[2], params.get('q') || '');
      return;
    }
    if (parts[0] === 'home' || !parts[0]) await renderHome(version);
    else if (parts[0] === 'search') await renderSearch(version, params);
    else if (parts[0] === 'book' && parts[1]) await renderBook(version, parts[1]);
    else if (parts[0] === 'sources') await renderSources(version, params);
    else if (parts[0] === 'profile') await renderProfile(version);
    else shell(`<div class="page">${emptyBlock('这一页不存在', '回到书桌继续阅读。')}<div style="text-align:center;margin-top:20px"><a class="btn primary" href="#/home">返回书桌</a></div></div>`, 'home');
  } catch (error) {
    if (version !== routeVersion) return;
    console.error(error);
    shell(`<div class="page">${emptyBlock('页面加载失败', error.message || '请稍后重试')}<div style="text-align:center;margin-top:20px"><a class="btn primary" href="#/home">返回书桌</a></div></div>`, 'home');
  }
}

root.addEventListener('submit', event => {
  if (event.target.id !== 'global-search') return;
  event.preventDefault();
  const data = new FormData(event.target);
  const query = String(data.get('q') || '').trim();
  const mode = String(data.get('mode') || 'books');
  location.hash = `#/search?q=${encodeURIComponent(query)}&mode=${mode}`;
});
root.addEventListener('click', async event => {
  const shelfButton = event.target.closest('[data-action="toggle-shelf"]');
  if (shelfButton) {
    event.preventDefault();
    const id = shelfButton.dataset.bookId;
    const books = await allBooks();
    const book = books.find(item => item.id === id) || onlineCache.get(id);
    if (!book) return;
    toggleShelf({ ...book, local: !book.source });
    if (location.hash.startsWith('#/home')) renderHome(routeVersion);
    else if (location.hash.startsWith('#/profile')) renderProfile(routeVersion);
    else {
      shelfButton.innerHTML = `${icon(isOnShelf(id) ? 'check' : 'plus')}${shelfButton.classList.contains('book-add') ? '' : (isOnShelf(id) ? '已在书架' : '加入书架')}`;
    }
  }
  const favorite = event.target.closest('[data-action="favorite-source"]');
  if (favorite) {
    const id = favorite.dataset.sourceId;
    const favorites = state.favoriteSources.includes(id) ? state.favoriteSources.filter(item => item !== id) : [...state.favoriteSources, id];
    saveState({ favoriteSources: favorites });
    favorite.classList.toggle('active', favorites.includes(id));
    favorite.title = favorites.includes(id) ? '移出常用' : '加入常用';
    toast(favorites.includes(id) ? '已加入常用书源' : '已移出常用书源');
  }
});
document.addEventListener('error', event => {
  if (event.target.matches?.('img[data-cover]')) event.target.style.display = 'none';
}, true);
window.addEventListener('hashchange', route);
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
route();
