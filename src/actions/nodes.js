import * as ActionTypes from '../constants/ActionTypes.js';
import { callApi } from '../api';
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

  let successAction = {
    type: ActionTypes.RECEIVE_NODES,
    nodes: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }

  let errorAction = { type: ActionTypes.NODES_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const searchNodes = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.SEARCH_NODES,
    query: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = {
    type: ActionTypes.RECEIVE_NODES,
    nodes: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }

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

  let successAction = {
    type: ActionTypes.RECEIVE_NODE,
    node: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }

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

  let successAction = {
    type: ActionTypes.RECEIVE_NODE,
    node: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }

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

export const startGetNode = (templatelabel, nodeId) => {
  return {
    type: ActionTypes.GET_NODE,
    templatelabel,
    nodeId
  }
}

// TODO --DM-- Remove
export const startPutNode = (node) => {
  return {
    type: ActionTypes.PUT_NODE,
    node
  }
}

export const startPostNode = (node) => {
  return {
    type: ActionTypes.POST_NODE,
    node
  }
}

export const startDeleteNode = (nodeId) => {
  return {
    type: ActionTypes.DELETE_NODE,
    nodeId
  }
}

export const receiveNode = (node) => {
  return {
    type: ActionTypes.RECEIVE_NODE,
    node,
    receivedAt: Date.now()
  }
}


///////////////////////////
// THUNK ACTION CREATORS //
///////////////////////////

// Base curried function to create dispatchActionWithStatus function for callApi()
const dispatchActionWithArgs = (dispatch) => (actionCreator) => (...args) => (status) => dispatch(actionCreator(status, args));

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

// Update node by id
export function fetchPutNode(node, payload) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(putNode)(node, payload);
    let apiArgs = {
      endpoint: `/x/${node.label}/${node.instance.nid}`,
      method: 'PUT',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}
