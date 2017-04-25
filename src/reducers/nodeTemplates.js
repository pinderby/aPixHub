import Helpers from '../helpers.js';
import * as ActionTypes from '../constants/ActionTypes.js';

const nodeTemplates = (state = {}, action) => {
  var templates = [];
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
    case ActionTypes.GET_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Get template from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.PUT_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Put updated template to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.POST_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Post new template to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.DELETE_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Delete template from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    default:
      return state
  }
}

export default nodeTemplates