import * as ActionTypes from '../constants/ActionTypes.js';
import Helpers from '../helpers.js';

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
      // Passes: action.node
      // Put updated node to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        instance: action.node
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

      // Restructure object's relationships use helper function
      let instance = Helpers.restructureNodeRelationships(action.node);
      console.log('new instance: ', instance); // TODO --DM-- Remove

      // Receive node from server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        instance: instance,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

export default node