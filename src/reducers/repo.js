import * as ActionTypes from '../constants/ActionTypes.js';

const repo = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_REPO:
      // Passes: action.repo
      // Update repo with passed object
      return Object.assign({}, state, action.repo);
    default:
      return state
  }
}

export default repo