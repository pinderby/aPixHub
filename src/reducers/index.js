import { combineReducers } from 'redux';
import node from './node';
import nodeTemplate from './nodeTemplate';
import nodeTemplates from './nodeTemplates';
import nodes from './nodes';

const appReducers = combineReducers({
    node,
    nodeTemplate,
    nodes,
    nodeTemplates
});

export default appReducers;