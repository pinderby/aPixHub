import * as ActionTypes from '../constants/ActionTypes.js';

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

export const startGetAllNodes = () => {
  return {
    type: ActionTypes.GET_ALL_NODES,
  }
}

export const startSearchNodes = (query) => {
  return {
    type: ActionTypes.SEARCH_NODES,
    query
  }
}

export const receiveNodes = (nodes) => {
  return {
    type: ActionTypes.RECEIVE_NODES,
    nodes,
    receivedAt: Date.now()
  }
}

export const startGetNode = (nodeId) => {
  return {
    type: ActionTypes.GET_NODE,
    nodeId
  }
}

export const putNode = (node) => {
  return {
    type: ActionTypes.PUT_NODE,
    node
  }
}

export const postNode = (node) => {
  return {
    type: ActionTypes.POST_NODE,
    node
  }
}

export const deleteNode = (nodeId) => {
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

// Fetch all nodes
export function fetchAllNodes(nodeLabel) {

  return function (dispatch) {

    // Send action all nodes are being fetched
    dispatch(startGetAllNodes());
    
    // Return api call to get all nodes
    fetch(`https://apix.rocks/x/${nodeLabel}`, {
      headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      method: 'GET'
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ 
      console.log('fetchNodes() Data: ', data ); // TODO --DM-- Remove

      // Receive all nodes from server when request is completed
      dispatch(receiveNodes(data));

    }).catch(function(err) {
      // Error :( TODO --DM-- Handle error
    });
  }
}

// Search nodes based on user query
export function searchNodes(nodeLabel, propKey, query) {

  return function (dispatch) {

    // Send action nodes are being fetched
    dispatch(startSearchNodes());

    // Initialize query object
    let queryObj = {};
    queryObj[propKey] = query;

    // Return api call to get search results
    fetch(`https://apix.rocks/x/${nodeLabel}/search`, {
      headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      method: 'POST',
      body: JSON.stringify({
        properties: queryObj // TODO --DM-- Change to select property
      })
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ 
      console.log('searchNodes() Data: ', data ); // TODO --DM-- Remove
      
      // Receive all nodes from server when request is completed
      dispatch(receiveNodes(data))
    }).catch(function(err) {
      // Error :( TODO --DM-- Handle error
    });
  }
}

// Fetch node by id
export function fetchNode(nodeId) {

  return function (dispatch) {

    // Send action node is being fetched
    dispatch(startGetNode(nodeId));

    // Return api call
    return fetch(`https://apix.rocks/nodes/${nodeId}`, {
      method: 'GET'
    })
    .then(function(response) {
      response.json().then(function(result) {
          console.log('getNode() result: ', result); // TODO --DM-- Remove

          // Receive node from server when request is completed
          dispatch(receiveNode(result))
      });

    }).catch(function(err) {
      // Error :( TODO --DM-- Handle error
    });
  }
}
