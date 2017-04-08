import { connect } from 'react-redux'
import { addProp } from '../actions'
import ApixNodeBuilder from '../components/ApixNodeBuilder'

const mapStateToProps = (state) => {
  return {
    node: state.node
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPropClick: (path, value) => {
      dispatch(addProp(path, value))
    }
  }
}

const NodeBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApixNodeBuilder)

export default NodeBuilderContainer