import * as ActionTypes from '../constants/ActionTypes.js';
import { dispatchActionWithArgs, callApi } from '../api';
import { actionByStatus } from './actionHelpers';

// Action Creator Helpers //

export const receiveTemplateSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_TEMPLATE,
    template: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}

export const receiveTemplatesSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_TEMPLATES,
    templates: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}

export const receiveRelationshipTemplateSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_RELATIONSHIP_TEMPLATE,
    template: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}

export const receiveRelationshipTemplatesSuccess = (statusObj) => {
  return {
    type: ActionTypes.RECEIVE_RELATIONSHIP_TEMPLATES,
    templates: statusObj ? statusObj.response : '',
    receivedAt: Date.now()
  }
}

/////////////////////
// ACTION CREATORS //
/////////////////////

// For Node Templates //

export const updateNodeTemplate = (nodeTemplate) => {
  return {
    type: ActionTypes.UPDATE_NODE_TEMPLATE,
    nodeTemplate
  }
}

export const initializeNodeTemplate = (nodeTemplate) => {
  return {
    type: ActionTypes.INITIALIZE_NODE_TEMPLATE,
    nodeTemplate
  }
}

export const getAllTemplates = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.GET_ALL_TEMPLATES,
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveTemplatesSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATES_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const searchTemplates = (query) => {
  return {
    type: ActionTypes.SEARCH_TEMPLATES,
    query
  }
}

export const receiveTemplates = (templates) => {
  return {
    type: ActionTypes.RECEIVE_TEMPLATES,
    templates,
    receivedAt: Date.now()
  }
}

export const getTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.GET_TEMPLATE,
    templatelabel: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const postTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.POST_TEMPLATE,
    payload: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const putTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.PUT_TEMPLATE,
    templateId: args[0],
    payload: args[1]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const deleteTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.DELETE_TEMPLATE,
    templateId: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const receiveTemplate = (template) => {
  return {
    type: ActionTypes.RECEIVE_TEMPLATE,
    template,
    receivedAt: Date.now()
  }
}

// For Relationship Templates //

export const updateRelationshipTemplate = (relationshipTemplate) => {
  return {
    type: ActionTypes.UPDATE_RELATIONSHIP_TEMPLATE,
    relationshipTemplate
  }
}

export const receiveRelationshipTemplates = (relationshipTemplates) => {
  return {
    type: ActionTypes.RECEIVE_RELATIONSHIP_TEMPLATES,
    relationshipTemplates,
    receivedAt: Date.now()
  }
}

export const getRelationshipTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.GET_RELATIONSHIP_TEMPLATE,
    relationshipTemplateId: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveRelationshipTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const postRelationshipTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.POST_RELATIONSHIP_TEMPLATE,
    payload: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveRelationshipTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const putRelationshipTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.PUT_RELATIONSHIP_TEMPLATE,
    relationshipTemplateId: args[0],
    payload: args[1]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveRelationshipTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const deleteRelationshipTemplate = (statusObj, args) => {
  let fetchingAction = {
    type: ActionTypes.DELETE_RELATIONSHIP_TEMPLATE,
    relationshipTemplateId: args[0]
  }
  
  if (typeof(statusObj) === 'undefined') return fetchingAction;

  let successAction = receiveRelationshipTemplateSuccess(statusObj);

  let errorAction = { type: ActionTypes.TEMPLATE_REQUEST_ERROR } // TODO --DM-- Implement
  
  return actionByStatus(statusObj.status, fetchingAction, successAction, errorAction)
}

export const receiveRelationshipTemplate = (relationshipTemplate) => {
  return {
    type: ActionTypes.RECEIVE_RELATIONSHIP_TEMPLATE,
    relationshipTemplate,
    receivedAt: Date.now()
  }
}

///////////////////////////
// THUNK ACTION CREATORS //
///////////////////////////

// For Node Templates //

// Fetch all templates
export function fetchTemplates() {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getAllTemplates)();
    let apiArgs = {
      endpoint: `/nodes`,
      method: 'GET',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Fetch template by label
export function fetchTemplate(templateLabel) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getTemplate)(templateLabel);
    let apiArgs = {
      endpoint: `/nodes?label=${templateLabel}`,
      method: 'GET',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Create new template
export function fetchPostTemplate(payload) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(postTemplate)(payload);
    let apiArgs = {
      endpoint: `/nodes`,
      method: 'POST',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Update template by label
export function fetchPutTemplate(templateId, payload) {

  return function (dispatch) {
    console.log('fetchPutTemplate() templateId, payload: ', templateId, payload); // TODO --DM-- Remove

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(putTemplate)(templateId, payload);
    let apiArgs = {
      endpoint: `/nodes/${templateId}`,
      method: 'PUT',
      payload: payload
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// Delete node by id
export function fetchDeleteTemplate(templateId) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(deleteTemplate)(templateId);
    let apiArgs = {
      endpoint: `/nodes/${templateId}`,
      method: 'DELETE',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// For Relationship Templates //

// Fetch relationship template by id
export function fetchRelationshipTemplate(templateId) {

  return function (dispatch) {

    // Define args for callApi()
    let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(getRelationshipTemplate)(templateId);
    let apiArgs = {
      endpoint: `/relationships/${templateId}`,
      method: 'GET',
      payload: {}
    }

    // Execute api call
    callApi(dispatchActionWithStatus, apiArgs);
  }
}

// // Create new relationship template
// export function fetchPostTemplate(payload) {

//   return function (dispatch) {

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(postTemplate)(payload);
//     let apiArgs = {
//       endpoint: `/nodes`,
//       method: 'POST',
//       payload: payload
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }

// // Update relationship template by label
// export function fetchPutTemplate(templateId, payload) {

//   return function (dispatch) {
//     console.log('fetchPutTemplate() templateId, payload: ', templateId, payload); // TODO --DM-- Remove

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(putTemplate)(templateId, payload);
//     let apiArgs = {
//       endpoint: `/nodes/${templateId}`,
//       method: 'PUT',
//       payload: payload
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }

// // Delete relationship template by id
// export function fetchDeleteTemplate(templateId) {

//   return function (dispatch) {

//     // Define args for callApi()
//     let dispatchActionWithStatus = dispatchActionWithArgs(dispatch)(deleteTemplate)(templateId);
//     let apiArgs = {
//       endpoint: `/nodes/${templateId}`,
//       method: 'DELETE',
//       payload: {}
//     }

//     // Execute api call
//     callApi(dispatchActionWithStatus, apiArgs);
//   }
// }