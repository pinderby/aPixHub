export const SET_APIX_NODE = 'SET_APIX_NODE'
export const SET_NODE_TEMPLATE = 'SET_NODE_TEMPLATE'

export function setApixNode(node) {
    return { type: SET_APIX_NODE, apixNode: node }
}

export function setNodeTemplate(template) {
    return { type: SET_NODE_TEMPLATE, nodeTemplate: template }
}