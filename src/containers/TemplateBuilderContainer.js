import { connect } from 'react-redux'
import { addProp } from '../actions'
import TemplateBuilder from '../components/NodeTemplate/TemplateBuilder'

const mapStateToProps = (state) => {
  return {
    nodeTemplate: state.nodeTemplate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onAddPropClick: (path, value) => {
      dispatch(addProp(path, value))
    }
  }
}

const TemplateBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilder)

export default TemplateBuilderContainer