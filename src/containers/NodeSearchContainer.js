import { connect } from 'react-redux';
import NodeSearch from '../components/NodeInstance/NodeSearch.js';

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    node: state.node,
    nodeTemplate: state.nodeTemplate,
    nodeLabel: state.nodeTemplate.label
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const NodeSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeSearch)

export default NodeSearchContainer