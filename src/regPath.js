const regPath = {
  "articlePage": /\/(products|front-end|server-side|blockchain|analysis)\/(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|Cryptocurrency|Google-Analytics)\/.+/,
  "listPage": /\/(products|front-end|server-side|blockchain|analysis)\/?(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|Cryptocurrency|Google-Analytics)?/
}

export const articlePageRegPath = regPath.articlePage;
export const listPageRegPath = regPath.listPage;
export default regPath;