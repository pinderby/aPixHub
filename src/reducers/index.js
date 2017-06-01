import { combineReducers } from 'redux';
import node from './node';
import nodeTemplate from './nodeTemplate';
import nodeTemplates from './nodeTemplates';
import nodes from './nodes';
import relationshipTemplate from './relationshipTemplate';

const appReducers = combineReducers({
    node,
    nodeTemplate,
    nodes,
    nodeTemplates,
    relationshipTemplate
});

export default appReducers;