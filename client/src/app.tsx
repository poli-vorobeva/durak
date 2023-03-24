import React from 'react';

import {Provider} from 'react-redux';
import store from './redux/store/store';
import {SocketApp} from './components/SocketApp';
export const App = () => (
  <Provider store={store}>
    <SocketApp />
  </Provider>
);
