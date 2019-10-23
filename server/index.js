import express from 'express';
import React from 'react';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { getServerStore } from '../store/store'
import routes from '../routes';
const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = getServerStore();
  console.log(req.path)
  const matchRoute = matchRoutes(routes, req.path);
  let requestQueue = [];
  matchRoute.forEach(match => {
    // console.log(match.route)
    if (match.route.component.getInitialProps) {
      requestQueue.push(match.route.component.getInitialProps(store))
    }
  })
  Promise.all(requestQueue).then(() => {
    const css = new Set() // CSS for all rendered React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
    const context = { isSSR: true, css: [] }
    const content = renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      </StyleContext.Provider>
    )
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>${[...css].join('')}</style>
        ${requestQueue.length > 0 ? `<script>
          window._context=${JSON.stringify(store.getState())}
          window._serverRouter="${req.path}"
        </script>`: ''}     
      </head>
      <body>
        <div id="root">${content}</div>        
        <script src="main.js"></script>
      </body>
      </html>
      `)
  })
})
app.listen(3000, () => {
  console.log('3000')
})