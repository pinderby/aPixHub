import { connect } from 'react-redux'
import { addProp } from '../actions'
import NodeObjectBuilder from '../components/NodeObjectBuilder'

const mapStateToProps = (state) => {
  return {
    node: state.node
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}

const ObjectBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeObjectBuilder)

export default ObjectBuilderContainer