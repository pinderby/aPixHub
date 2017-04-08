import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import appReducers from './reducers'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { initializeNode } from './actions';

let store = createStore(appReducers);
store.dispatch(initializeNode({ properties: {hi: 'hi'} }))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
