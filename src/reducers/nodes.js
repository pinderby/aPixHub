import * as ActionTypes from '../constants/ActionTypes.js';

const nodes = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NODES:
      // Passes: action.nodes
      // Update nodes with passed array
      return action.nodes;
    case ActionTypes.GET_ALL_NODES:
      // Passes: TODO --DM-- fill out
      // Get all nodes from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.SEARCH_NODES:
      // Passes: TODO --DM-- fill out
      // Search nodes on server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_NODES:
      // Passes: action.nodes
      // Receive nodes from server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        instances: action.nodes,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default nodes