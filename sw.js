const CACHE_NAME = 'pigmie-cache-v20';
const ASSETS_TO_CACHE = [
  './?v=20',
  './index.html?v=20',
  './app.html?v=20',
  './styles.css?v=20',
  './app.js?v=20',
  './sync.js?v=20',
  './org.js?v=20',
  './audit.js?v=20',
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
            return caches.match('./index.html?v=20') || caches.match('./index.html');
          }
          throw err;
        });
      })
  );
});
