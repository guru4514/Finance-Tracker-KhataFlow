const CACHE_NAME = 'pigmie-cache-v24';
const ASSETS_TO_CACHE = [
  './?v=24',
  './app.html?v=24',
  './styles.css?v=24',
  './app.js?v=24',
  './sync.js?v=24',
  './org.js?v=24',
  './audit.js?v=24',
  './customer-portal.js?v=24',
  './permissions.js?v=24',
  './manifest.json',
  './icon-192.png',
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
            return caches.match('./app.html?v=24') || caches.match('./app.html');
          }
          throw err;
        });
      })
  );
});
