import { connect } from 'react-redux';
import ApixNodePopulator from '../components/ApixNodePopulator.js';

const mapStateToProps = (state) => {
  return {
    nodeTemplate: state.nodeTemplate,
    node: state.node
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
)(ApixNodePopulator)

export default NodePopulatorContainer