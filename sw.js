const CACHE_NAME = 'pigmie-cache-v18';
const ASSETS_TO_CACHE = [
  './?v=18',
  './index.html?v=18',
  './styles.css?v=18',
  './app.js?v=18',
  './sync.js?v=18',
  './org.js?v=18',
  './audit.js?v=18',
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
        // Return cached version if found
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request).then(
          (networkResponse) => {
            // Optional: cache new assets dynamically
            return networkResponse;
          }
        );
      })
  );
});
