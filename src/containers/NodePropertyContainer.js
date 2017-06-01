import { connect } from 'react-redux';
import NodeProperty from '../components/NodeProperty.js';

const mapStateToProps = (state) => {
  return {
    // TODO --DM-- Add props if needed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const NodePropertyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeProperty)

export default NodePropertyContainer