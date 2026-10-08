const CACHE_NAME = "essence-nails-v3";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./wallpaperbackspace.png",
  "./fotos.json",
  "./logo-essence.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      // Agora dentro do waitUntil, funciona no iOS também
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", event => {
  // Ignora requisições do WhatsApp e do Google Fonts
  if (event.request.url.includes("wa.me") || event.request.url.includes("googleapis")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Só cacheia se for sucesso
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
