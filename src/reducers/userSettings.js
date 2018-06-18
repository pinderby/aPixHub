import * as ActionTypes from '../constants/ActionTypes.js';

const userSettings = (state = { repos: {} }, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SETTINGS:
      // Passes: action.settings
      // Update settings with passed object
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        settings: action.settings,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

export default userSettings