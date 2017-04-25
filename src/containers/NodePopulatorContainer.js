import { connect } from 'react-redux';
import NodeInstancePopulator from '../components/NodeInstance/NodeInstancePopulator.js';

const mapStateToProps = (state) => {
  return {
    nodeTemplate: state.nodeTemplate,
    node: state.node,
    nodeLabel: state.nodeTemplate.label
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const NodePopulatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeInstancePopulator)

export default NodePopulatorContainer