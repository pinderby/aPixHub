import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import appReducers from './reducers'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { updateNode, updateNodeTemplate } from './actions';
// import logan from './logan.json';
import test_node_template from './test_node_template.json';

let store = createStore(appReducers);
// Log the initial state
console.log('getState(): ', store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log('getState(): ', store.getState())
);

// store.dispatch(updateNodeTemplate(test_node_template)) // TODO --DM-- Change to API call

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Stop listening to state updates
unsubscribe();
