import { connect } from 'react-redux';
import NodeTemplate from '../components/TemplatesPanel/NodeTemplate.js';

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

const NodeTemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeTemplate)

export default NodeTemplateContainer