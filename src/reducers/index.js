import { combineReducers } from 'redux';
import node from './node';
import nodeTemplate from './nodeTemplate';

const appReducers = combineReducers({
    node,
    nodeTemplate
});

export default appReducers;