export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const formatWords = value => value >= 10000 ? `${(value / 10000).toFixed(value >= 100000 ? 0 : 1)}万字` : `${value || 0}字`;
export const domainOf = value => { try { return new URL(value, 'https://example.com').hostname.replace(/^www\./, ''); } catch { return ''; } };
export const timeAgo = value => {
  if (!value) return '';
  const seconds = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 3600) return '刚刚';
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  if (seconds < 86400 * 30) return `${Math.floor(seconds / 86400)}天前`;
  return new Date(value).toLocaleDateString('zh-CN');
};

const STATE_KEY = 'desk_state_v1';
const CUSTOM_SOURCES_KEY = 'desk_custom_sources_v1';
const defaults = {
  schemaVersion: 3,
  shelf: ['yiriweijian', 'mindfulness', 'dentist'],
  onlineBooks: [],
  progress: {},
  bookmarks: [],
  favoriteSources: [],
  settings: { theme: 'light', fontSize: 19, lineHeight: 1.95, width: 720, font: 'serif' },
};

function readState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    const shelf = Array.isArray(saved.shelf) ? [...saved.shelf] : [...defaults.shelf];
    if ((saved.schemaVersion || 1) < 2 && !shelf.includes('mindfulness')) shelf.push('mindfulness');
    if ((saved.schemaVersion || 1) < 3 && !shelf.includes('dentist')) shelf.push('dentist');
    return {
      ...defaults,
      ...saved,
      settings: { ...defaults.settings, ...(saved.settings || {}) },
      shelf,
      onlineBooks: Array.isArray(saved.onlineBooks) ? saved.onlineBooks : [],
      bookmarks: Array.isArray(saved.bookmarks) ? saved.bookmarks : [],
      favoriteSources: Array.isArray(saved.favoriteSources) ? saved.favoriteSources : [],
      progress: saved.progress && typeof saved.progress === 'object' ? saved.progress : {},
    };
  } catch { return structuredClone(defaults); }
}

export let state = readState();
export function saveState(patch = {}) {
  state = { ...state, ...patch };
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
  catch { toast('浏览器存储空间不足，本次修改未能保存'); }
  return state;
}
export function updateSettings(patch) {
  saveState({ settings: { ...state.settings, ...patch } });
  applySettings();
}
export function applySettings() {
  const settings = state.settings;
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.style.setProperty('--reader-fs', `${settings.fontSize}px`);
  document.documentElement.style.setProperty('--reader-lh', settings.lineHeight);
  document.documentElement.style.setProperty('--reader-width', `${settings.width}px`);
  document.documentElement.style.setProperty('--reader-font', settings.font === 'sans'
    ? 'Inter,"PingFang SC","Microsoft YaHei",system-ui,sans-serif'
    : '"Noto Serif SC","Source Han Serif SC","Songti SC",SimSun,serif');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', settings.theme === 'dark' ? '#151917' : settings.theme === 'sepia' ? '#f3ecdf' : '#f6f7f4');
}

let toastTimer;
export function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

async function fetchJSON(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeout || 12000);
  try {
    const response = await fetch(url, { signal: options.signal || controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timer); }
}

let libraryPromise;
const bookPromises = new Map();
let sourcesPromise;
export function loadLibrary() {
  libraryPromise ||= fetchJSON('data/library.json');
  return libraryPromise;
}
export function loadBook(id) {
  if (!bookPromises.has(id)) bookPromises.set(id, fetchJSON(`data/books/${encodeURIComponent(id)}.json`));
  return bookPromises.get(id);
}
export function loadSources() {
  sourcesPromise ||= fetchJSON('data/sources.json', { timeout: 20000 });
  return sourcesPromise;
}
export function getCustomSources() {
  try {
    const data = JSON.parse(localStorage.getItem(CUSTOM_SOURCES_KEY) || 'null');
    return data && Array.isArray(data.sources) ? data : null;
  } catch { return null; }
}
export function saveCustomSources(sources) {
  localStorage.setItem(CUSTOM_SOURCES_KEY, JSON.stringify({ importedAt: new Date().toISOString(), sources }));
}
export function clearCustomSources() { localStorage.removeItem(CUSTOM_SOURCES_KEY); }
export async function allSources() {
  const custom = getCustomSources();
  return custom ? custom.sources : loadSources();
}
export function normalizeSources(raw) {
  if (!Array.isArray(raw)) throw new Error('书源文件必须是 JSON 数组');
  const seen = new Set();
  return raw.filter(item => item && item.enabled !== false).map(item => ({
    n: String(item.bookSourceName || item.n || '').trim(),
    u: String(item.bookSourceUrl || item.u || '').trim(),
    g: String(item.bookSourceGroup || item.g || '').split('|')[0].split(',')[0].trim(),
    s: String(item.searchUrl || item.s || '').trim(),
  })).filter(item => {
    if (!item.n || !item.u) return false;
    const key = `${item.n}|${item.u}|${item.s}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function allBooks() {
  const library = await loadLibrary();
  return [...library.books, ...state.onlineBooks];
}
export function isOnShelf(id) { return state.shelf.includes(id); }
export function toggleShelf(book) {
  const exists = isOnShelf(book.id);
  if (exists) {
    saveState({ shelf: state.shelf.filter(id => id !== book.id) });
    toast('已从书架移除');
    return false;
  }
  const onlineBooks = book.local ? state.onlineBooks : [...state.onlineBooks.filter(item => item.id !== book.id), book].slice(-60);
  saveState({ shelf: [...state.shelf, book.id], onlineBooks });
  toast('已加入书架');
  return true;
}

export function hueFor(title) {
  let hash = 0;
  for (const char of String(title)) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return 105 + hash % 155;
}
export function cover(book, compact = false) {
  const title = book.shortTitle || book.title || '未命名书籍';
  const safeImage = book.cover && /^https:\/\//i.test(book.cover) ? book.cover : '';
  return `<div class="cover${compact ? ' compact' : ''}" style="--hue:${hueFor(title)}">
    ${safeImage ? `<img data-cover src="${esc(safeImage)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ''}
    <div class="cover-title">${esc(title)}</div><div class="cover-rule"></div>
    <div class="cover-author">${esc(book.author || '佚名')}</div><div class="cover-brand">DESK LIBRARY</div></div>`;
}

export function bookCard(book, options = {}) {
  const progress = state.progress[book.id];
  const isLocal = !book.source || book.local;
  const safeUrl = /^https?:\/\//i.test(book.url || '') ? book.url : '#/search';
  const href = isLocal ? `#/book/${encodeURIComponent(book.id)}` : safeUrl;
  const external = isLocal ? '' : ' target="_blank" rel="noopener noreferrer"';
  const add = options.add ? `<button class="book-add" data-action="toggle-shelf" data-book-id="${esc(book.id)}" aria-label="${isOnShelf(book.id) ? '移出书架' : '加入书架'}">${icon(isOnShelf(book.id) ? 'check' : 'plus')}</button>` : '';
  return `<article class="book-card">${add}<a class="book-cover-link" href="${esc(href)}"${external}>${cover(book)}</a>
    <a href="${esc(href)}"${external}><div class="book-name">${esc(book.title)}</div></a>
    <div class="book-author">${esc(book.author || '佚名')}</div>
    ${progress ? `<div class="book-progress">读至 ${Math.round(progress.percent || 0)}%</div>` : ''}</article>`;
}

export function sourceSearchUrl(source, keyword) {
  const base = source.u || '';
  let spec = source.s || '';
  const fallback = () => {
    try {
      const url = new URL(base.split('#')[0]);
      return /^https?:$/.test(url.protocol) ? url.href : '#';
    } catch { return '#'; }
  };
  if (!spec || /@js:|<js>|webView/i.test(spec)) return fallback();
  const optionAt = spec.search(/,\s*\{/);
  if (optionAt >= 0) {
    const optionsText = spec.slice(optionAt + 1);
    if (/method["']?\s*:\s*["']?POST/i.test(optionsText)) return fallback();
    spec = spec.slice(0, optionAt);
  }
  const encoded = encodeURIComponent(keyword || '');
  spec = spec.replace(/\{\{\s*key\s*\}\}/g, encoded).replace(/\{\{\s*page\s*\}\}/g, '1');
  spec = spec.replace(/\{\{[^{}]*page[^{}]*\}\}/g, '1');
  if (!/[?&](?:key|query|keyword|search|wd|q)=/.test(spec) && !spec.includes(encoded)) return fallback();
  try {
    const url = new URL(spec, base);
    return /^https?:$/.test(url.protocol) ? url.href : fallback();
  } catch { return fallback(); }
}

function googleBook(item) {
  const info = item.volumeInfo || {};
  return {
    id: `google_${item.id}`,
    title: info.title || '未命名书籍',
    author: (info.authors || []).join('、') || '佚名',
    desc: String(info.description || '').replace(/<[^>]+>/g, ''),
    cover: info.imageLinks?.thumbnail?.replace(/^http:/, 'https:') || '',
    publisher: info.publisher || '', published: info.publishedDate || '',
    source: 'Google Books', url: info.infoLink || item.selfLink || '', local: false,
  };
}
function openLibraryBook(item) {
  return {
    id: `openlib_${String(item.key || '').replace(/\W/g, '_')}`,
    title: item.title || '未命名书籍',
    author: (item.author_name || []).join('、') || '佚名',
    desc: Array.isArray(item.first_sentence) ? item.first_sentence[0] : (item.first_sentence || ''),
    cover: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : '',
    publisher: Array.isArray(item.publisher) ? item.publisher[0] : '',
    published: item.first_publish_year ? String(item.first_publish_year) : '',
    source: 'Open Library', url: `https://openlibrary.org${item.key || ''}`, local: false,
  };
}
export async function searchOnlineBooks(keyword) {
  const q = encodeURIComponent(keyword);
  const requests = [
    fetchJSON(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=12`, { timeout: 14000 })
      .then(data => (data.items || []).map(googleBook)),
    fetchJSON(`https://openlibrary.org/search.json?q=${q}&limit=12&fields=key,title,author_name,cover_i,first_publish_year,publisher,first_sentence`, { timeout: 14000 })
      .then(data => (data.docs || []).map(openLibraryBook)),
  ];
  const settled = await Promise.allSettled(requests);
  const books = [];
  const errors = [];
  settled.forEach(result => {
    if (result.status === 'fulfilled') books.push(...result.value);
    else errors.push(result.reason);
  });
  const seen = new Set();
  return {
    books: books.filter(book => {
      const key = `${book.title}|${book.author}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }),
    errors,
  };
}

export function fullTextSearch(book, keyword, limit = 40) {
  const query = keyword.trim().toLowerCase();
  if (!query) return [];
  const results = [];
  for (const chapter of book.chapters) {
    for (const section of chapter.sections) {
      const index = section.text.toLowerCase().indexOf(query);
      if (index < 0) continue;
      const start = Math.max(0, index - 45);
      const end = Math.min(section.text.length, index + keyword.length + 85);
      results.push({ chapter, text: section.text.slice(start, end), prefix: start > 0 ? '…' : '', suffix: end < section.text.length ? '…' : '' });
      if (results.length >= limit) return results;
    }
  }
  return results;
}
export function highlight(text, keyword) {
  const safe = esc(text);
  const query = esc(keyword.trim());
  if (!query) return safe;
  const pattern = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try { return safe.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>'); }
  catch { return safe; }
}
