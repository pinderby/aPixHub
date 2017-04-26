import * as ActionTypes from '../constants/ActionTypes.js';

const node = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NODE:
      // Passes: action.node
      // Update node with passed object
      return action.node;
    default:
      return state
  }
}

export default node