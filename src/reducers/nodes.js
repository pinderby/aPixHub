import * as ActionTypes from '../constants/ActionTypes.js';

const node = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_NODES:
      // Passes: action.nodes
      // Update nodes with passed array
      return action.nodes;
    default:
      return state
  }
}

export default node