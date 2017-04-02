import { combineReducers } from 'redux'
import { 
    REQUEST_APIX_NODE, REQUEST_NODE_TEMPLATE, 
    SET_APIX_NODE, SET_NODE_TEMPLATE, SET_NODES
} from '../controllers/actions'

const initialState = {
    selectedNode: null,
    selectedTemplate: null,
    isFetching: false
}

function selectedNode(state = {}, action) {
    switch(action.type) {
        case REQUEST_APIX_NODE:
            return Object.assign({}, state, { isFetching: true })

        case SET_APIX_NODE:
            return Object.assign({}, state, { selectedNode: action.apixNode, isFetching: false })
        
        default:
            return state
    }
}

function selectedTemplate(state = {}, action) {
    switch(action.type) {
        case REQUEST_NODE_TEMPLATE:
            return Object.assign({}, state, { isFetching: true })
        
        case SET_NODE_TEMPLATE:
            return Object.assign({}, state, { selectedTemplate: action.nodeTemplate, isFetching: false })
        
        default:
            return state
    }
}

function nodes(state = {}, action) {
    console.log('Received nodes response')
    switch(action.type) {
        case SET_NODES:
            return Object.assign({}, state, { nodes: action.nodes, isFetching: false })

        default:
            return state
    }
}

const apixReducer = combineReducers({
    selectedNode,
    selectedTemplate,
    nodes
})

export default apixReducer;