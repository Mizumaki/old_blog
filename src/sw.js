importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

const regPath = {
  "articlePageHtml": /\/(products|front-end|server-side|blockchain|analysis)\/(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|Cryptocurrency|Google-Analytics)\/.+\.amp\.html$/,
  "listPage": /\/(products|front-end|server-side|blockchain|analysis)\/?(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|Cryptocurrency|Google-Analytics)?/
}

if (workbox) {
  console.log(`ワークボックス準備完了 🎉🎉🎉`);

  workbox.precaching.precacheAndRoute([]);
  workbox.routing.registerNavigationRoute('/index.html');
  
  workbox.routing.registerRoute(
    regPath.articlePageHtml,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'article-amp-html',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/api/.*'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'api',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );

  // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
  );

  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    }),
  );

} else {
  console.log(`失敗しちまった😬😬😬`);
}