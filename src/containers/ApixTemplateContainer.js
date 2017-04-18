import { connect } from 'react-redux';
import ApixTemplate from '../components/ApixTemplate.js';

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

const ApixTemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApixTemplate)

export default ApixTemplateContainer