import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../routes';
import { getClientStore } from '../store/store'

ReactDOM.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      {routes.map(route => <Route {...route}></Route>)}
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'))