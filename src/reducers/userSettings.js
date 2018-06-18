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
    case ActionTypes.UPDATE_REPO_SETTINGS:
      // Passes: action.repo, action.repoSettings
      // Update settings with passed object
      let nextSettings = { repos: {} };
      nextSettings.repos[action.repo.name] = action.repoSettings;
      console.log("UPDATE_REPO_SETTINGS: ", nextSettings); // TODO --DTM-- Remove

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        settings: nextSettings,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

export default userSettings