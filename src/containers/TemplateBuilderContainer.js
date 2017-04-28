import { connect } from 'react-redux'
import TemplateBuilder from '../components/NodeTemplate/TemplateBuilder'

const mapStateToProps = (state) => {
  return {
    nodeTemplate: state.nodeTemplate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const TemplateBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateBuilder)

export default TemplateBuilderContainer