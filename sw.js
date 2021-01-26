const CacheName = 'Cache:v1';

self.addEventListener('install', e => {
  console.log('ServiceWorker install:', e);
});

self.addEventListener('activate', e => {
  console.log('ServiceWorker activate:', e);
});

const networkFallingBackToCache = async request => {
  const cache = await caches.open(CacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.error(err);
    return cache.match(request);
  }
};

self.addEventListener('fetch', event => {
  event.respondWith(networkFallingBackToCache(event.request));
});
