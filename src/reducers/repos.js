import * as ActionTypes from '../constants/ActionTypes.js';

const repos = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_REPOS:
      // Passes: action.repos
      // Update repos with passed array
      return action.repos;
    default:
      return state;
  }
}

export default repos