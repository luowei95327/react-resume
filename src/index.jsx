import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../src/redux/store/reduxDevTools';
import Resume from '../src/components/Resume'
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Resume />
  </Provider>, 
  document.getElementById('root')
);
