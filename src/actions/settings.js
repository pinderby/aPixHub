import * as ActionTypes from '../constants/ActionTypes.js';
import { dispatchActionWithArgs, callApi } from '../api';
import { actionByStatus } from './actionHelpers';

// Action Creator Helpers //

// For Settings //

export const updateSettings = (settings) => {
  return {
    type: ActionTypes.UPDATE_SETTINGS,
    settings
  }
}

export const updateRepoSettings = (repo, repoSettings) => {
  return {
    type: ActionTypes.UPDATE_REPO_SETTINGS,
    repo,
    repoSettings
  }
}

///////////////////////////
// THUNK ACTION CREATORS //
///////////////////////////

// Fetch settings
// TODO --DTM-- Implement with API
// export function fetchMySettings() {

//   return function (dispatch) {

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getUser)('me');
//     let apiArgs = {
//       endpoint: `/users/me`,
//       method: 'GET',
//       payload: {}
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }


