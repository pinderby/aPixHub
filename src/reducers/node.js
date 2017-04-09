import Helpers from '../helpers.js';
import * as ActionTypes from '../actionTypes.js';

const node = (state = {}, action) => {
  var node = {};
  switch (action.type) {
    case ActionTypes.UPDATE_NODE:
      // Passes: action.node
      // Initialize node with passed object
      return action.node;
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

export default node