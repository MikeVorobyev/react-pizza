import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import './index.css';
import App from './App';

import { store } from './redux/store';    // store мы добавили из @reduxjs/toolkit библиотеки

import { Provider } from 'react-redux';   // Provider мы добавили из react-redux библиотеки, он нужен нам длятого, чтобы соеденить redux и react вместе,
                                          // так как @reduxjs/toolkit является самостаятельной библиотекой, никак не связанной с react


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <HashRouter>
          <App />
      </HashRouter>
  </Provider>
);