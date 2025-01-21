const CACHE_NAME = 'space-catcher-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/IMG_7206.png',
    '/lovvchik.mp3',
    '/icon-192.png',
    '/icon-512.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
