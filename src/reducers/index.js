import { combineReducers } from 'redux';
import user from './user';
import repo from './repo';
import repos from './repos';
import nodeTemplate from './nodeTemplate';
import nodeTemplates from './nodeTemplates';
import node from './node';
import nodes from './nodes';
import relationshipTemplate from './relationshipTemplate';
import userSettings from './userSettings';

const appReducers = combineReducers({
    user,
    repo,
    repos,
    node,
    nodeTemplate,
    nodes,
    nodeTemplates,
    relationshipTemplate,
    userSettings
});

export default appReducers;