const CACHE = 'desk-library-v3';
const CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'assets/app.css', 'assets/core.js', 'assets/app.js', 'assets/reader.js', 'assets/icon.svg',
  'data/library.json', 'data/books/yiriweijian.json', 'data/books/mindfulness.json', 'data/books/dentist.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.toLowerCase().endsWith('.pdf')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, copy));
      return response;
    }).catch(() => caches.match(request).then(response => response || caches.match('index.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(cached => {
    const network = fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => cached);
    return cached || network;
  }));
});
