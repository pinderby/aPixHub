import { combineReducers } from 'redux';
import node from './node';
import nodeTemplate from './nodeTemplate';
import nodes from './nodes';

const appReducers = combineReducers({
    node,
    nodeTemplate,
    nodes
});

export default appReducers;