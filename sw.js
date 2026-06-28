const CACHE_NAME = 'navegue-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e salva os arquivos básicos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta as requisições para o app funcionar mais rápido
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se encontrar
        }
        return fetch(event.request); // Senão, busca na internet
      })
  );
});
