import { connect } from 'react-redux'
import { addProp } from '../actions'
import TemplateObjectBuilder from '../components/NodeTemplate/TemplateObjectBuilder'

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
)(TemplateObjectBuilder)

export default ObjectBuilderContainer