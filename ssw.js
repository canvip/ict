

var dataCacheName = 'ict-v1';
var cacheName = 'ict-final-1';
var filesToCache = [
  
  '/',
  'https://ict-2017.glitch.me/ssw.js',
  'https://ict-2017.glitch.me/'
     
     
];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});




self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});



self.addEventListener('fetch', function(e) {
	if (e.request.mode == 'navigate') {
		console.log('Handling fetch e for', e.request.url);
		console.log(e.request);
		e.respondWith(
			fetch(e.request).catch(function(exception) {
				// The `catch` is only triggered if `fetch()` throws an exception,
				// which most likely happens due to the server being unreachable.
				console.error(
					'Fetch failed; returning offline page instead.',
					exception
				);
				return caches.open(filesToCache).then(function(cache) {
					return cache.match('/');
				});
			})
		);
	} else {
		// It’s not a request for an HTML document, but rather for a CSS or SVG
		// file or whatever…
		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request);
			})
		);
	}

});


/*
// TODO: Replace Xs.

importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js');
// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});

 *
class CustomHandler extends workbox.runtimeCaching.Handler {
  /**
   * handle() is passed an Object with an event property, and should return a
   * Promise for a Response.
   */  /*
  handle({event}) {
    console.log('CustomHandler is handling', event);
    // this.requestWrapper is a RequestWrapper instance:
    // https://workboxjs.org/reference-docs/latest/module-workbox-runtime-caching.RequestWrapper.html#main
    return this.requestWrapper.fetch({
      request: event.request,
    }).catch(() => new Response('Oops! The fetch() failed.'));
  }
}
*/
/**
 * Initialize all of the different strategies using the default settings.
 */  /*
const strategies = {
  networkOnly: new workbox.runtimeCaching.NetworkOnly(),
  networkFirst: new workbox.runtimeCaching.NetworkFirst(),
  // CacheOnly will always fail, because we don't have the URL precached.
  cacheOnly: new workbox.runtimeCaching.CacheOnly(),
  cacheFirst: new workbox.runtimeCaching.CacheFirst(),
  staleWhileRevalidate: new workbox.runtimeCaching.StaleWhileRevalidate(),
  custom: new CustomHandler(),
};
*/
/**
 * Set up a fetch handler that uses caching strategy corresponding to the value
 * of the `strategy` URL parameter.
 */ /*
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const strategyToUse = url.searchParams.get('strategy');
  if (strategyToUse in strategies) {
    event.respondWith(
      strategies[strategyToUse].handle({event})
    );
  }
});


*/

/**
 * This is boilerplate, instructing the service worker to take control as soon
 * as it can.
 */
/*


workbox.precache([
  {
    "url": "https://cdn.glitch.com/0264b8ff-6d27-4539-a1fe-b8fc7dc5214f%2Ficon-256x256.png?1511537115348",
    "revision": "7dc612bd22a1710ad8c318480f474ea5"
  }
 
]);

/////////////////////////////////////////////
*/