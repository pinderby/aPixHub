import * as ActionTypes from '../actionTypes.js';

export const initializeNode = (node) => {
  return {
    type: ActionTypes.INITIALIZE_NODE,
    node
  }
}

export const addProp = (path, value) => {
  return {
    type: ActionTypes.ADD_PROPERTY,
    path,
    value
  }
}

export const setProp = (path, value) => {
  return {
    type: ActionTypes.SET_PROPERTY,
    path,
    value
  }
}

export const removeProp = (path) => {
  return {
    type: ActionTypes.REMOVE_PROPERTY,
    path
  }
}