import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/reduxDevTools';
import Resume from './components/Resume'
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Resume />
  </Provider>
);
