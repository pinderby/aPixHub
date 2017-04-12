import * as ActionTypes from '../constants/ActionTypes.js';

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

export const submitNodeTemplate = (nodeTemplate) => {
  return {
    type: ActionTypes.SUBMIT_NODE_TEMPLATE,
    nodeTemplate
  }
}

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