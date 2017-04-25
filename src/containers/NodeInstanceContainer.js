import { connect } from 'react-redux';
import NodeInstance from '../components/NodeInstance/NodeInstance.js';

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

const NodeInstanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeInstance)

export default NodeInstanceContainer