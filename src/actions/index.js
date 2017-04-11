import * as ActionTypes from '../constants/actionTypes.js';

export const updateNode = (node) => {
  return {
    type: ActionTypes.UPDATE_NODE,
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

export const renameProp = (oldPath, newPath, value) => {
  return {
    type: ActionTypes.RENAME_PROPERTY,
    oldPath,
    newPath,
    value
  }
}

export const removeProp = (path) => {
  return {
    type: ActionTypes.REMOVE_PROPERTY,
    path
  }
}