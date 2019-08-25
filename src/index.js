import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import App from './app';

import './brand.css';

const initApp = function(appId="estatesContainer", config={}) {
  const appContainer = document.getElementById(appId);
  render(
    <div className="main-container">
      <h1></h1>
      <App />
    </div>,
    appContainer
  )
}
initApp();