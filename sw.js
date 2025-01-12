const CACHE_NAME = 'au-portfolio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/favicon/site.webmanifest',
    '/favicon/favicon.ico',
    '/favicon/favicon.svg',
    '/favicon/favicon-96x96.png',
    '/favicon/apple-touch-icon.png',
    '/favicon/web-app-manifest-192x192.png',
    '/favicon/web-app-manifest-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
