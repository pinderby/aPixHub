import * as ActionTypes from '../constants/ActionTypes.js';

const node = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NODE:
      // Passes: action.node
      // Update node with passed object
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        instance: action.node,
        lastUpdated: action.receivedAt
      })
    case ActionTypes.GET_NODE:
      // Passes: TODO --DM-- fill out
      // Get node from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.PUT_NODE:
      // Passes: TODO --DM-- fill out
      // Put updated node to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.POST_NODE:
      // Passes: TODO --DM-- fill out
      // Post new node to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.DELETE_NODE:
      // Passes: TODO --DM-- fill out
      // Delete node from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_NODE:
      // Passes: action.node
      // Receive node from server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        instance: action.node,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default node