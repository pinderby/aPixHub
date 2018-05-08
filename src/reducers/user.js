import * as ActionTypes from '../constants/ActionTypes.js';
import Helpers from '../helpers.js';

const user = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      // Passes: action.user
      // Update user with passed object
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        user: action.user,
        lastUpdated: action.receivedAt
      })
    case ActionTypes.GET_USER:
      // Passes: TODO --DM-- fill out
      // Get user from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.PUT_USER:
      // Passes: action.node
      // Put updated user to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        user: action.user
      })
    case ActionTypes.POST_USER:
      // Passes: TODO --DM-- fill out
      // Post new user to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.DELETE_USER:
      // Passes: TODO --DM-- fill out
      // Delete user from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_USER:
      // Passes: action.user
      // Receive user from server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        user: action.user,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

export default user