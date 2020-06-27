self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...');

  // TODO: Caching App Shell Resource
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...');

  // TODO: Delete old caches
});

self.addEventListener('fetch', (event) => {
  console.log(event.request);

  event.respondWith(fetch(event.request));

  // TODO: Add/get fetch request to/from caches
});
