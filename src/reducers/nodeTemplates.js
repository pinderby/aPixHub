import * as ActionTypes from '../constants/ActionTypes.js';

const nodeTemplates = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_TEMPLATES:
      // Passes: TODO --DM-- fill out
      // Get all templates from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.SEARCH_TEMPLATES:
      // Passes: TODO --DM-- fill out
      // Search templates on server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_TEMPLATES:
      // Passes: TODO --DM-- fill out
      // Receive templates from server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        templates: action.templates,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default nodeTemplates