import { SET_APIX_NODE, SET_NODE_TEMPLATE } from '../controllers/actions'
import createStore from 'redux'

var apixReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_APIX_NODE:
            return { apixNode: action.apixNode }
        
        case SET_NODE_TEMPLATE:
            return { nodeTemplate: action.nodeTemplate }
        
        default:
            return state
    }
}

module.exports = {
    configureStore: function(initialState) {
        return createStore(apixReducer, initialState)
    }
}