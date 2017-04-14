import { connect } from 'react-redux';
import ApixNode from '../components/ApixNode.js';

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

const ApixNodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApixNode)

export default ApixNodeContainer