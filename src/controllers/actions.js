import fetch from 'isomorphic-fetch'

export const REQUEST_APIX_NODE = 'REQUEST_APIX_NODE'
export const REQUEST_NODE_TEMPLATE = 'REQUEST_NODE_TEMPLATE'
export const SET_APIX_NODE = 'SET_APIX_NODE'
export const SET_NODE_TEMPLATE = 'SET_NODE_TEMPLATE'
export const SET_NODES = 'SET_NODES'

const API_URL = 'https://apix.rocks'

function appendEndpoint(endpoint) {
    return API_URL + endpoint
}

function buildNodeEndpoint(label, nid) {
    if (nid) return appendEndpoint('/x/${label}/${nid}')

    return appendEndpoint('/x/${label}')
}

function buildTemplateEndpoint(tid) {
    if (id) return appendEndpoint('/${tid}')

    return API_URL
}

function requestApixNode(label, nid) {
    return { type: REQUEST_APIX_NODE, label, nid }
}

function requestNodeTemplate(tid) {
    return { type: REQUEST_NODE_TEMPLATE, tid }
}

function setApixNode(node) {
    // TODO Handle an array of nodes
    return { type: SET_APIX_NODE, apixNode: node }
}

function setNodeTemplate(template) {
    console.log('setNodeTemplate()')
    // TODO Handle an array of templates
    return { type: SET_NODE_TEMPLATE, nodeTemplate: template }
}

function setNodes(nodes) {
    console.log('setNodes()')
    return { type: SET_NODES, nodes: nodes }
}

export function fetchApixNode(label, nid) {
    // Thunk function for chaining dispatch calls
    return function (dispatch) {
        // Dispatch our request action
        dispatch(requestApixNode(label, nid))

        // Here we return a promise to wait for the result from our request
        return fetch(buildNodeEndpoint(label, nid))
            .then(response => response.json())
            .then(json => dispatch(setApixNode(json)))
            // TODO Add catch/handler for error
    }
}

export function fetchApixNodes(label) {
    // Passing in a null id queries the whole table
    return fetchApixNode(label, null)
}

export function fetchNodeTemplate(tid) {
    // Thunk function for chaining dispatch calls
    return function (dispatch) {
        // Dispatch our request action
        dispatch(requestNodeTemplate(tid))

        // Here we return a promise to wait for the result from our request
        return fetch(buildTemplateEndpoint(tid))
            .then(response => response.json())
            .then(json => dispatch(setNodeTemplate(json)))
            // TODO Add catch/handler for error
    }
}

export function fetchNodeTemplates() {
    // Passing in a null id queries the whole table
    return fetchNodeTemplate(null)
}

export function fetchNodes() {
    console.log('Called fetchNodes()')
    return function (dispatch) {
        return fetch(appendEndpoint('/nodes'))
            .then(response => response.json())
            .then(json => dispatch(setNodes(json)))
    }
}