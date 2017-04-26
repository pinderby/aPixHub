import * as ActionTypes from '../constants/ActionTypes.js';

export const getAllTemplates = () => {
  return {
    type: ActionTypes.GET_ALL_TEMPLATES,
  }
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

export const getTemplate = (templateId) => {
  return {
    type: ActionTypes.GET_TEMPLATE,
    templateId
  }
}

export const putTemplate = (template) => {
  return {
    type: ActionTypes.PUT_TEMPLATE,
    template
  }
}

export const postTemplate = (template) => {
  return {
    type: ActionTypes.POST_TEMPLATE,
    template
  }
}

export const deleteTemplate = (templateId) => {
  return {
    type: ActionTypes.DELETE_TEMPLATE,
    templateId
  }
}

export const receiveTemplate = (template) => {
  return {
    type: ActionTypes.RECEIVE_TEMPLATE,
    template,
    receivedAt: Date.now()
  }
}


///////////////////////////
// THUNK ACTION CREATORS //
///////////////////////////

// Fetch all templates
export function fetchTemplates() {

  return function (dispatch) {

    // Send action all templates are being fetched
    dispatch(getAllTemplates());

    // Return api call
    return fetch('https://apix.rocks/nodes', {
      method: 'GET'
    })
    .then(function(response) {
      let templates = [];
      response.json().then(function(result) {
          
          // Push all templates into templates array
          result.forEach(function (template) {
            templates.push(template);
          });

          // Receive all templates from server when request is completed
          dispatch(receiveTemplates(templates))
      });

    }).catch(function(err) {
      // Error :( TODO --DM-- Handle error
    });
  }
}

// Fetch template by id
export function fetchTemplate(templateId) {

  return function (dispatch) {

    // Send action all templates are being fetched
    dispatch(getTemplate(templateId));

    // Return api call
    return fetch('https://apix.rocks/nodes/'+templateId, {
      method: 'GET'
    })
    .then(function(response) {
      response.json().then(function(result) {
          console.log('getTemplate() result: ', result); // TODO --DM-- Remove

          // Receive all templates from server when request is completed
          dispatch(receiveTemplate(result))
      });

    }).catch(function(err) {
      // Error :( TODO --DM-- Handle error
    });
  }
}
