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

export const updateNodes = (nodes) => {
  return {
    type: ActionTypes.UPDATE_NODES,
    nodes
  }
}