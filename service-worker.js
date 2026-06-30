var CACHE_NAME = 'offlinewiki-shell-CURRENT_DATE';
var CACHE_PREFIX = 'offlinewiki-shell-';

var APP_SHELL = [
  './',
  'index.html',
  'styles.css',
  'js/autocomplete.js',
  'js/search.js',
  'js/lzma.js',
  'js/render.js',
  'js/ui.js',
  'js/fs2.js',
  'image/favicon.png',
  'image/xkcd.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(APP_SHELL);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(key){
        if(key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME){
          return caches.delete(key);
        }
      }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;

  if(event.request.mode === 'navigate'){
    event.respondWith(
      fetch(event.request).catch(function(){
        return caches.match('index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function(cached){
      if(cached) return cached;

      return fetch(event.request).then(function(response){
        return response;
      });
    })
  );
});
