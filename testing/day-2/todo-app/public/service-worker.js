const CACHE_NAME = "my-pwa-cache-v1";
const OFFLINE_URL = "/offline.html";

// List the assets you want to precache — include the important build files, offline page and manifest.
// If using CRA/Vite, make sure the build outputs are referenced here (index.html, css, js bundles).
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  OFFLINE_URL,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Force the offline page to be cached
      await cache.addAll(PRECACHE_URLS);
      self.skipWaiting();
    })()
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
      self.clients.claim();
    })()
  );
});

// Fetch: use cache-first for navigation and static resources, network-first for API calls
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Use network-first for API requests (example: /api/)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(req));
    return;
  }

  // For navigation requests (HTML), try cache first then network then offline fallback
  if (
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html")
  ) {
    event.respondWith(
      (async () => {
        try {
          const response = await caches.match(req);
          if (response) return response;

          const networkResponse = await fetch(req);
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          // If both fail, return offline page from cache
          const cache = await caches.open(CACHE_NAME);
          return cache.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }

  // For other requests (images, CSS, JS) — cache-first
  event.respondWith(cacheFirst(req));
});

// Helpers
async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const response = await fetch(req);
    // Put a copy in cache (but only if response is ok)
    if (response && response.status === 200) {
      cache.put(req, response.clone());
    }
    return response;
  } catch (err) {
    // If offline and resource not in cache, fallback to offline page for navigations handled above.
    return caches.match(OFFLINE_URL);
  }
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(req);
    // Save to cache
    if (response && response.status === 200) {
      cache.put(req, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(req);
    return cached || caches.match(OFFLINE_URL);
  }
}
