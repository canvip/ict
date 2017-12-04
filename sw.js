'use strict';


importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.1.2.js');
const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});

workbox.router.registerRoute(/(.*)views(.*)\.(?:png|gif|jpg|html)/,
  workbox.strategies.networkFirst(),
                             

);

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox For Webpack';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
workbox.precache([
  {
    "url": "https://ict-2017.glitch.me/index.html",
    "revision": "7dc612bd22a1710ad8c318480f474ea5"
  },
  {
    "url": "https://cdn.glitch.com/bff8d421-515b-4f42-b9fb-e1c89f580b5d%2Fsus.jpg?1512340355803",
    "revision": "7dcm12bd22a1710ad8c318480f474ea5"
  },
  {
    "url": "https://ict-2017.glitch.me/app.js",
    "revision": "7dccv2bd22a1710ad8c318480f474ea5"
  },
  {
    "url": "https://ict-2017.glitch.me/style.css",
    "revision": "7dccv2bd22a1710a18480f474ea5"
  }
]);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
