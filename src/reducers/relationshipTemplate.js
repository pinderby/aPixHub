import * as ActionTypes from '../constants/ActionTypes.js';

const relationshipTemplate = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_RELATIONSHIP_TEMPLATE:
      // Passes: action.relationshipTemplate
      // Update relationshipTemplate with passed object
      return Object.assign({}, state, action.relationshipTemplate);
    case ActionTypes.GET_RELATIONSHIP_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Get template from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.PUT_RELATIONSHIP_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Put updated template to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.POST_RELATIONSHIP_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Post new template to server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.DELETE_RELATIONSHIP_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Delete template from server
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_RELATIONSHIP_TEMPLATE:
      // Passes: TODO --DM-- fill out
      // Receive template from server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        template: action.template,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default relationshipTemplate