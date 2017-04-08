import Helpers from '../helpers.js';
import * as ActionTypes from '../actionTypes.js';

const node = (state = {}, action) => {
  var node = {};
  switch (action.type) {
    case ActionTypes.INITIALIZE_NODE:
      return action.node;
    case ActionTypes.ADD_PROPERTY:
    case ActionTypes.SET_PROPERTY:
      node = Object.assign({}, state);
      node = Helpers.setObjProp(node, action.path, action.value);

      return node;
    case ActionTypes.REMOVE_PROPERTY:
      node = Object.assign({}, state);
      node = Helpers.removeObjProp(node, action.path);

      return node;
    default:
      return state
  }
}

export default node