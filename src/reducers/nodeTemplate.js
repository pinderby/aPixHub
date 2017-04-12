import Helpers from '../helpers.js';
import * as ActionTypes from '../constants/ActionTypes.js';

const nodeTemplate = (state = {}, action) => {
  var node = {};
  switch (action.type) {
    case ActionTypes.UPDATE_NODE_TEMPLATE:
      // Passes: action.nodeTemplate
      // Update nodeTemplate with passed object
      return action.nodeTemplate;
    case ActionTypes.SUBMIT_NODE_TEMPLATE:
      // Passes: action.nodeTemplate
      // Post nodeTemplate to server
      return action.nodeTemplate;
    case ActionTypes.INITIALIZE_NODE_TEMPLATE:
      // Passes: action.nodeTemplate
      // Update nodeTemplate with passed object
      
      // Initialize template and properties
      var nodeTemplate = {}, props = action.nodeTemplate.properties;
      
      // Initialize template label and empty properties object
      nodeTemplate.label = action.nodeTemplate.label;
      nodeTemplate.properties = {};

      // Add all properties and store the key and type
      props.forEach(function (prop) {
        nodeTemplate.properties[prop.key] = {
          key: prop.key,
          label: prop.key,
          type: prop.value_type
        }
      });

      return nodeTemplate;
    case ActionTypes.ADD_PROPERTY:
    case ActionTypes.SET_PROPERTY:
      // Passes: action.path, action.value
      // Copy node from state
      node = Object.assign({}, state);

      // Set new node property to new value
      node = Helpers.setObjProp(node, action.path, action.value);

      return node;
    case ActionTypes.RENAME_PROPERTY:
      // Passes: action.oldPath, action.newPath, action.value?
      // Copy node from state
      node = Object.assign({}, state);

      // If no new value is passed, get old value
      if (action.oldPath && (typeof(action.value) === "undefined")) {
        action.value = Helpers.getObjProp(node, action.oldPath);
      }

      // Create/overwrite new property
      if (action.value) {
        Helpers.setObjProp(node, action.newPath, action.value);
      }

      // Remove old property if oldPath
      if (action.oldPath) {
        Helpers.removeObjProp(node, action.oldPath);
      }

      return node;
    case ActionTypes.REMOVE_PROPERTY:
      // Passes: action.path
      // Copy node from state
      node = Object.assign({}, state);

      // Remove property
      node = Helpers.removeObjProp(node, action.path);

      return node;
    default:
      return state
  }
}

export default nodeTemplate