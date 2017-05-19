import * as ActionTypes from '../constants/ActionTypes.js';
import { dispatchActionWithArgs, callApi } from '../api';
import { actionByStatus } from './actionHelpers';

export const updateNode = (node) => {
  return {
    type: ActionTypes.UPDATE_NODE,
    node
  }
}

export const updateNodes = (nodes) => {
  return {
    type: ActionTypes.UPDATE_NODES,
    nodes
  }
}

export const getAllNodes = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.GET_ALL_NODES,
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveNodesSuccess(statusObj);

  let errorAction = { type: ActionTypes.NODES_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const searchNodes = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.SEARCH_NODES,
    query: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveNodesSuccess(statusObj);

  let errorAction = { type: ActionTypes.NODES_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const getNode = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.GET_NODE,
    templatelabel: args[0],
    nodeId: args[1]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveNodeSuccess(statusObj);

  let errorAction = { type: ActionTypes.NODE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const postNode = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.POST_NODE,
    templateLabel: args[0],
    payload: args[1]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveNodeSuccess(statusObj);

  let errorAction = { type: ActionTypes.NODE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const putNode = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.PUT_NODE,
    node: args[0],
    payload: args[1]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveNodeSuccess(statusObj);

  let errorAction = { type: ActionTypes.NODE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const deleteNode = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.DELETE_NODE,
    node: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveNodeSuccess(statusObj);

  let errorAction = { type: ActionTypes.NODE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const receiveNodes = (nodes) => {
  return {
    type: ActionTypes.RECEIVE_NODES,
    nodes,
    receivedAt: Date.now()
  }
}

export const receiveNode = (node) => {
  return {
    type: ActionTypes.RECEIVE_NODE,
    node,
    receivedAt: Date.now()
  }
}

// Action Creator Helpers //

export const receiveNodeSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_NODE,
    node: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}

export const receiveNodesSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_NODES,
    nodes: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}


///////////////////////////
// THUNK ACTION CREATORS //
///////////////////////////

// Fetch all nodes
export function fetchAllNodes(templateLabel) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getAllNodes)();
    let apiArgs = {
      endpoint: `/x/${templateLabel}`,
      method: 'GET',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Search nodes based on user query
export function fetchSearchNodes(templateLabel, propKey, query) {

  return function (dispatch) {

    // Initialize query object
    let queryObj = {};
    queryObj[propKey] = query;

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(searchNodes)(query);
    let apiArgs = {
      endpoint: `/x/${templateLabel}/search`,
      method: 'POST',
      payload: JSON.stringify({
        properties: queryObj // TODO --DM-- Change to select property
      })
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Fetch node by id
export function fetchNode(templateLabel, nodeId) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getNode)(templateLabel, nodeId);
    let apiArgs = {
      endpoint: `/x/${templateLabel}/${nodeId}`,
      method: 'GET',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Create new node
export function fetchPostNode(node, payload) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(postNode)(node.label, payload);
    let apiArgs = {
      endpoint: `/x/${node.label}`,
      method: 'POST',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Update node by id
export function fetchPutNode(node, payload) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(putNode)(node, payload);
    let apiArgs = {
      endpoint: `/x/${node.label}/${node.nid}`,
      method: 'PUT',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Delete node by id
export function fetchDeleteNode(node) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(deleteNode)(node);
    let apiArgs = {
      endpoint: `/x/${node.label}/${node.nid}`,
      method: 'DELETE',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}
