const CACHE_NAME = 'studentmind';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/kontakt.html',
    '/sadrzaj.html',
    '/css/tptpstil.css',
    '/js/tptpskripte.js',
    '/manifest.json',
    '/images/citanje.jpeg',
    '/images/hrana.jpeg',
    '/images/joga.jpeg',
    '/images/krevet.jpeg',
    '/images/meditacija.jpeg',
    '/images/meditacija.webp',
    '/images/prijatelji.jpeg',
    '/images/spavanje.jpg',
    '/images/suma.jpeg',
    '/images/trcanje.jpeg',
    '/images/ucenje.jpeg',
    '/images/ucenje.webp'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(STATIC_ASSETS))
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
        .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request))
    );
});
// service_worker.js generisan uz pomoc AI-a
