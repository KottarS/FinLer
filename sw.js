// Файл sw.js (Service Worker)
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('space-catcher').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                // Добавьте пути к другим ресурсам (изображения, звуки)
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
