import * as ActionTypes from '../constants/ActionTypes.js';

const nodeTemplate = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NODE_TEMPLATE:
      // Passes: action.nodeTemplate
      // Update nodeTemplate with passed object
      return Object.assign({}, state, action.nodeTemplate);
    case ActionTypes.SUBMIT_NODE_TEMPLATE:
      // Passes: action.nodeTemplate
      // Post nodeTemplate to server
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        template: action.nodeTemplate,
        lastUpdated: action.receivedAt
      });
    case ActionTypes.INITIALIZE_NODE_TEMPLATE:
      // Passes: action.nodeTemplate
      // Update nodeTemplate with passed object
      
      // Initialize template and properties
      // let nodeTemplate = Object.assign({}, action.nodeTemplate);

      // TODO --DM-- Remove if no longer needed
      // let props = action.nodeTemplate.properties;
      
      // // Initialize template empty properties object and overwrite
      // nodeTemplate.properties = {};

      // // Add all properties and store the key and type
      // props.forEach(function (prop) {
      //   nodeTemplate.properties[prop.key] = {
      //     key: prop.key,
      //     label: prop.key,
      //     type: prop.value_type
      //   }
      // });

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        template: action.nodeTemplate,
        lastUpdated: action.receivedAt
      });
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
    case ActionTypes.RECEIVE_TEMPLATE:
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

export default nodeTemplate