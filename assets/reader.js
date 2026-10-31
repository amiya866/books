import { $, $$, esc, icon, state, saveState, updateSettings, loadBook, highlight, clamp, toast } from './core.js';

let cleanupCurrent = null;
export function cleanupReader() {
  if (cleanupCurrent) cleanupCurrent();
  cleanupCurrent = null;
  document.body.classList.remove('reader-mode');
}

export async function mountReader(root, bookId, chapterId, query = '') {
  cleanupReader();
  const book = await loadBook(bookId);
  const index = Math.max(0, book.chapters.findIndex(chapter => chapter.id === chapterId));
  const chapter = book.chapters[index] || book.chapters[0];
  if (!chapter) throw new Error('这本书还没有章节');
  const previous = state.progress[bookId] || {};
  const wasBookmarked = state.bookmarks.some(item => item.bookId === bookId && item.chapter === chapter.id);
  document.body.classList.add('reader-mode');
  document.title = `${chapter.title} · ${book.title}`;

  root.innerHTML = `<div class="reader-progress" id="reader-progress"></div>
    <header class="reader-header" id="reader-header">
      <a class="btn ghost" href="#/book/${encodeURIComponent(bookId)}">${icon('left')}<span>返回书籍</span></a>
      <div class="reader-book-title">${esc(book.title)}</div>
      <div class="reader-tools">
        <button class="reader-tool" data-reader="toc" title="目录" aria-label="目录">${icon('list')}</button>
        <button class="reader-tool${wasBookmarked ? ' active' : ''}" data-reader="bookmark" title="书签" aria-label="书签">${icon('bookmark')}</button>
        <button class="reader-tool" data-reader="settings" title="阅读设置" aria-label="阅读设置">${icon('settings')}</button>
      </div>
    </header>
    <main class="reader-main">
      ${chapter.part ? `<div class="reader-part">${esc(chapter.part)}</div>` : ''}
      <h1 class="reader-chapter-title">${esc(chapter.title)}</h1>
      ${chapter.subtitle ? `<div class="reader-subtitle">${esc(chapter.subtitle)}</div>` : ''}
      <hr class="reader-rule">
      <article class="reader-content">${chapter.sections.map(section => section.type === 'h3'
        ? `<h3>${highlight(section.text, query)}</h3>`
        : `<p>${highlight(section.text, query)}</p>`).join('')}</article>
      <nav class="reader-chapter-nav">
        ${index > 0 ? `<a class="btn" href="#/read/${encodeURIComponent(bookId)}/${chapterIdFor(book, index - 1)}">${icon('left')} ${esc(book.chapters[index - 1].title)}</a>` : '<span></span>'}
        ${index < book.chapters.length - 1 ? `<a class="btn" href="#/read/${encodeURIComponent(bookId)}/${chapterIdFor(book, index + 1)}">${esc(book.chapters[index + 1].title)} ${icon('right')}</a>` : '<span></span>'}
      </nav>
      <div class="reader-bottom-space">第 ${index + 1} / ${book.chapters.length} 章 · 个人学习收藏</div>
    </main>
    <aside class="reader-drawer" id="toc-drawer" aria-hidden="true"><div class="drawer-mask" data-close-drawer></div>
      <div class="drawer-panel left"><div class="drawer-head"><div class="drawer-title">${esc(book.title)}</div><button class="drawer-close" data-close-drawer>${icon('x')}</button></div>
      <nav class="reader-toc">${tocHTML(book, chapter.id)}</nav></div></aside>
    <aside class="reader-drawer" id="settings-drawer" aria-hidden="true"><div class="drawer-mask" data-close-drawer></div>
      <div class="drawer-panel right"><div class="drawer-head"><div class="drawer-title">阅读设置</div><button class="drawer-close" data-close-drawer>${icon('x')}</button></div>
      ${settingsHTML()}</div></aside>`;

  const abort = new AbortController();
  const { signal } = abort;
  const header = $('#reader-header');
  let lastScroll = 0;
  let lastSaved = 0;
  let ticking = false;
  let seconds = previous.seconds || 0;
  const startedAt = Date.now();

  function ratio() {
    const doc = document.documentElement;
    return clamp(doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight), 0, 1);
  }
  function saveProgress() {
    const currentRatio = ratio();
    const percent = clamp(((index + currentRatio) / book.chapters.length) * 100, 0, 100);
    saveState({ progress: { ...state.progress, [bookId]: {
      chapter: chapter.id, ratio: currentRatio, percent, seconds,
      title: book.title, updatedAt: new Date().toISOString(),
    } } });
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      $('#reader-progress').style.width = `${ratio() * 100}%`;
      header.classList.toggle('hidden', y > lastScroll && y > 320 && !$('.reader-drawer.open'));
      lastScroll = y;
      ticking = false;
      if (Date.now() - lastSaved > 500) {
        saveProgress();
        lastSaved = Date.now();
      }
    });
  }
  function openDrawer(id) {
    $$('.reader-drawer').forEach(drawer => {
      const open = drawer.id === id;
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
    });
    header.classList.remove('hidden');
  }
  function closeDrawers() {
    $$('.reader-drawer').forEach(drawer => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    });
  }
  function refreshSettings() {
    const container = $('#settings-drawer .drawer-panel');
    if (!container) return;
    container.innerHTML = `<div class="drawer-head"><div class="drawer-title">阅读设置</div><button class="drawer-close" data-close-drawer>${icon('x')}</button></div>${settingsHTML()}`;
  }

  root.addEventListener('click', event => {
    const tool = event.target.closest('[data-reader]');
    if (tool) {
      const action = tool.dataset.reader;
      if (action === 'toc') openDrawer('toc-drawer');
      if (action === 'settings') openDrawer('settings-drawer');
      if (action === 'bookmark') {
        const exists = state.bookmarks.some(item => item.bookId === bookId && item.chapter === chapter.id);
        const bookmarks = exists
          ? state.bookmarks.filter(item => !(item.bookId === bookId && item.chapter === chapter.id))
          : [{ bookId, chapter: chapter.id, title: chapter.title, bookTitle: book.title, createdAt: new Date().toISOString() }, ...state.bookmarks].slice(0, 100);
        saveState({ bookmarks });
        tool.classList.toggle('active', !exists);
        toast(exists ? '已删除本章书签' : '已添加本章书签');
      }
    }
    if (event.target.closest('[data-close-drawer]')) closeDrawers();
    const theme = event.target.closest('[data-theme-choice]');
    if (theme) { updateSettings({ theme: theme.dataset.themeChoice }); refreshSettings(); }
    const font = event.target.closest('[data-font-choice]');
    if (font) { updateSettings({ font: font.dataset.fontChoice }); refreshSettings(); }
    const step = event.target.closest('[data-setting-step]');
    if (step) {
      const key = step.dataset.settingStep;
      const direction = Number(step.dataset.direction);
      const settings = { ...state.settings };
      if (key === 'fontSize') settings.fontSize = clamp(settings.fontSize + direction, 15, 26);
      if (key === 'lineHeight') settings.lineHeight = clamp(Math.round((settings.lineHeight + direction * .1) * 10) / 10, 1.5, 2.5);
      if (key === 'width') settings.width = clamp(settings.width + direction * 40, 560, 920);
      updateSettings(settings);
      refreshSettings();
    }
  }, { signal });

  root.addEventListener('input', event => {
    if (!event.target.matches('[data-setting-range]')) return;
    const key = event.target.dataset.settingRange;
    updateSettings({ [key]: Number(event.target.value) });
    const output = event.target.closest('.setting-block')?.querySelector('.range-value');
    if (output) output.textContent = settingValue(key);
  }, { signal });

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener('pagehide', saveProgress, { signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDrawers();
    if (event.target.matches('input,textarea,select')) return;
    if (event.key === 'ArrowLeft' && index > 0) location.hash = `#/read/${bookId}/${book.chapters[index - 1].id}`;
    if (event.key === 'ArrowRight' && index < book.chapters.length - 1) location.hash = `#/read/${bookId}/${book.chapters[index + 1].id}`;
  }, { signal });
  const timer = setInterval(() => { seconds += 30; saveProgress(); }, 30000);

  cleanupCurrent = () => {
    seconds += Math.floor((Date.now() - startedAt) / 1000) % 30;
    saveProgress();
    clearInterval(timer);
    abort.abort();
    document.title = '书桌 · 找书与阅读';
  };

  if (query) {
    requestAnimationFrame(() => $('.reader-content mark')?.scrollIntoView({ block: 'center' }));
  } else if (previous.chapter === chapter.id && previous.ratio > 0) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const doc = document.documentElement;
      window.scrollTo({ top: previous.ratio * (doc.scrollHeight - doc.clientHeight), behavior: 'instant' });
      onScroll();
    }));
  } else {
    window.scrollTo(0, 0);
    saveProgress();
  }
  onScroll();
}

function chapterIdFor(book, index) { return encodeURIComponent(book.chapters[index].id); }
function tocHTML(book, activeId) {
  let part = '';
  return book.chapters.map((chapter, index) => {
    const partLabel = chapter.part && chapter.part !== part ? `<div class="toc-part">${esc(chapter.part)}</div>` : '';
    part = chapter.part || part;
    return `${partLabel}<a class="${chapter.id === activeId ? 'active' : ''}" href="#/read/${encodeURIComponent(book.id)}/${encodeURIComponent(chapter.id)}"><span class="toc-index">${String(index + 1).padStart(2, '0')}</span> ${esc(chapter.title)}</a>`;
  }).join('');
}
function settingValue(key) {
  if (key === 'fontSize') return `${state.settings.fontSize}px`;
  if (key === 'lineHeight') return state.settings.lineHeight.toFixed(1);
  return `${state.settings.width}px`;
}
function settingsHTML() {
  const settings = state.settings;
  return `<div class="setting-block"><div class="setting-label">阅读背景</div><div class="theme-options">
    ${[['light','浅色'],['sepia','护眼'],['dark','夜间']].map(([value,label]) => `<button class="theme-option${settings.theme === value ? ' active' : ''}" data-theme-choice="${value}"><span class="theme-dot ${value}"></span>${label}</button>`).join('')}</div></div>
    ${rangeSetting('fontSize','正文字号',15,26,1)}
    ${rangeSetting('lineHeight','正文行距',1.5,2.5,.1)}
    ${rangeSetting('width','阅读页宽',560,920,40)}
    <div class="setting-block"><div class="setting-label">正文字体</div><div class="font-options"><button class="btn${settings.font === 'serif' ? ' active' : ''}" data-font-choice="serif">衬线</button><button class="btn${settings.font === 'sans' ? ' active' : ''}" data-font-choice="sans">黑体</button></div></div>`;
}
function rangeSetting(key, label, min, max, step) {
  return `<div class="setting-block"><div class="setting-label">${label}</div><div class="range-row"><button data-setting-step="${key}" data-direction="-1">−</button><div><input type="range" min="${min}" max="${max}" step="${step}" value="${state.settings[key]}" data-setting-range="${key}" aria-label="${label}"><div class="range-value">${settingValue(key)}</div></div><button data-setting-step="${key}" data-direction="1">＋</button></div></div>`;
}
