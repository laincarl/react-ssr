import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from 'react-redux';
import routes from '../routes';
import { getClientStore } from '../store/store'
const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}
ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <Provider store={getClientStore()}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  </StyleContext.Provider>
  , document.querySelector('#root'))