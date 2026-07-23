const CACHE_NAME = 'pigmie-cache-v21';
const ASSETS_TO_CACHE = [
  './?v=21',
  './index.html?v=21',
  './app.html?v=21',
  './styles.css?v=21',
  './app.js?v=21',
  './sync.js?v=21',
  './org.js?v=21',
  './audit.js?v=21',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).catch((err) => {
          if (event.request.mode === 'navigate') {
            return caches.match('./app.html?v=21') || caches.match('./app.html') || caches.match('./index.html?v=21') || caches.match('./index.html');
          }
          throw err;
        });
      })
  );
});
