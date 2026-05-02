var CACHE = "uacr-v1";
var FILES = [
  "/uacr-monitor/index.html",
  "/uacr-monitor/dashboard.html",
  "/uacr-monitor/profile.html",
  "/uacr-monitor/resources.html",
  "/uacr-monitor/logo.png",
  "/uacr-monitor/manifest.json"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
