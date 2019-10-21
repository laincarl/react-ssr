import express from 'express';
import React from 'react';
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { getServerStore } from '../store/store'
import routes from '../routes';

const store = getServerStore()
const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  const matchRoute = matchRoutes(routes, req.path);
  console.log(matchRoute)
  let requestQueue = [];
  matchRoute.forEach(match => {
    if (match.route.component.load) {
      requestQueue.push(match.route.component.load(store))
    }
  })
  Promise.all(requestQueue).then(() => {
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          {routes.map(route => <Route {...route}></Route>)}
        </StaticRouter>
      </Provider>
    )
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window._context=${JSON.stringify(store.getState())}
        </script>
        <script src="main.js"></script>
      </body>
      </html>
      `)
  })
})
app.listen(9090, () => {
  console.log('9090')
})