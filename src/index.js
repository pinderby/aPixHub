import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import appReducers from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// For Testing TODO --DM-- Remove
// import { fetchTemplates } from './actions/templates.js';
// import { updateNode, updateNodeTemplate } from './actions';
// import logan from './logan.json';
// import test_node_template from './test_node_template.json';

// TODO --DTM-- Remove if no longer needed
import test_data from  './test_data.json'; // TODO --DTM-- Delete
const initialState = {
    repo: test_data.repos[0],
    nodeTemplates: test_data.templates,
    nodes: test_data.nodes
};

const store = createStore(
  appReducers,
  initialState,
  applyMiddleware(
    thunk, // lets us dispatch() functions
    logger // neat middleware that logs actions
  )
);

// Log the initial state
console.log('getState(): ', store.getState()) // TODO --DM-- Remove

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log('getState(): ', store.getState()) // TODO --DM-- Remove
);

// TODO --DM-- Remove (for testing API calls)
// store.dispatch(fetchTemplates()).then(() =>
//   console.log('fetchTemplates(): ', store.getState())
// )

ReactDOM.render(
  <Provider store={store}>
    <Router history={window.history} component={AppContainer} >
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// Stop listening to state updates
unsubscribe();
