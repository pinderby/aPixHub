import * as ActionTypes from '../constants/ActionTypes.js';
import { dispatchActionWithArgs, callApi } from '../api';
import { actionByStatus } from './actionHelpers';

// Action Creator Helpers //

export const receiveUserSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_USER,
    user: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}

// TODO --DTM-- Implement once backend is done
// export const receiveUsersSuccess = (statusObj) => {
//   return {
//     type: ActionTypes.RECEIVE_USERS,
//     users: statusObj ? statusObj.response : '',
//     receivedAt: Date.now()
//   }
// }

// For Users //

export const updateUser = (user) => {
  return {
    type: ActionTypes.UPDATE_USER,
    user
  }
}

// TODO --DTM-- Implement once backend is done
// export const updateUsers = (users) => {
//   return {
//     type: ActionTypes.UPDATE_USERS,
//     users
//   }
// }

export const authUser = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.AUTH_USER,
    username: args[0],
    password: args[1]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveUserSuccess(statusObj);

  let errorAction = { type: ActionTypes.USER_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

// TODO --DTM-- Need to get all users?
// export const getAllNodes = (statusObj, args) => {
//   let fetchingAction = {
//     type: ActionTypes.GET_ALL_NODES,
//   }
  
//   if (typeof(statusObj) === 'undefined') return fetchingAction;

//   let successAction = receiveNodesSuccess(statusObj);

//   let errorAction = { type: ActionTypes.NODES_REQUEST_ERROR } // TODO --DM-- Implement
  
//   return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
// }

// TODO --DTM-- When backend gets implemented
// export const searchUsers = (statusObj, args) => {
//   let fetchingAction = {
//     type: ActionTypes.SEARCH_USERS,
//     query: args[0]
//   }
  
//   if (typeof(statusObj) === 'undefined') return fetchingAction;

//   let successAction = receiveUsersSuccess(statusObj);

//   let errorAction = { type: ActionTypes.USERS_REQUEST_ERROR } // TODO --DM-- Implement
  
//   return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
// }

export const getUser = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.GET_USER,
    username: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveUserSuccess(statusObj);

  let errorAction = { type: ActionTypes.USER_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const postUser = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.POST_USER,
    user: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveUserSuccess(statusObj);

  let errorAction = { type: ActionTypes.USER_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const putUser = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.PUT_USER,
    user: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveUserSuccess(statusObj);

  let errorAction = { type: ActionTypes.USER_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

// TODO --DTM-- When backend gets implemented
// export const deleteUser = (statusObj, args) => {
//   let fetchingAction = {
//     type: ActionTypes.DELETE_USER,
//     user: args[0]
//   }
  
//   if (typeof(statusObj) === 'undefined') return fetchingAction;

//   let successAction = receiveUserSuccess(statusObj);

//   let errorAction = { type: ActionTypes.USER_REQUEST_ERROR } // TODO --DM-- Implement
  
//   return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
// }

// TODO --DTM-- When backend gets implemented
// export const receiveUsers = (users) => {
//   return {
//     type: ActionTypes.RECEIVE_USERS,
//     users,
//     receivedAt: Date.now()
//   }
// }

// export const receiveUser = (user) => {
//   return {
//     type: ActionTypes.RECEIVE_USER,
//     user,
//     receivedAt: Date.now()
//   }
// }

///////////////////////////
// THUNK ACTION CREATORS //
///////////////////////////

// For Users //

// TODO --DTM-- Need to get all users?
// Fetch all users
// export function fetchAllUsers() {

//   return function (dispatch) {

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getAllUsers)();
//     let apiArgs = {
//       endpoint: `/x/users/`,
//       method: 'GET',
//       payload: {}
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }

// TODO --DTM-- When backend gets implemented
// Search nodes based on user query
// export function fetchSearchUsers(query) {

//   return function (dispatch) {

//     // Initialize query object
//     let queryObj = {};
//     queryObj[propKey] = query;

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(searchNodes)(query);
//     let apiArgs = {
//       endpoint: `/x/${templateLabel}/search`,
//       method: 'POST',
//       payload: JSON.stringify({
//         properties: queryObj // TODO --DM-- How to send username queries?
//       })
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }

// Auth user
export function fetchAuthUser(username, password) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(authUser)(username, password);
    let apiArgs = {
      endpoint: `/auth?user%5Busername%5D=${username}&user%5Bpassword%5D=${password}`,
      method: 'GET',
      payload: {},
      contentType: 'application/x-www-form-urlencoded'
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Fetch user by username
export function fetchUser(username) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getUser)(username);
    let apiArgs = {
      endpoint: `/users/${username}`,
      method: 'GET',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Create new user
export function fetchPostUser(payload) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(postUser)(payload);
    let apiArgs = {
      endpoint: `/users/`,
      method: 'POST',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Update me
export function fetchPutUser(payload) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(putUser)(payload);
    let apiArgs = {
      endpoint: `/me`,
      method: 'PUT',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// TODO --DTM-- When backend gets implemented
// Delete node by id
// export function fetchDeleteNode(node) {

//   return function (dispatch) {

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(deleteNode)(node);
//     let apiArgs = {
//       endpoint: `/x/${node.label}/${node.nid}`,
//       method: 'DELETE',
//       payload: {}
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }


