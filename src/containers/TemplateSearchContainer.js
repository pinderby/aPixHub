import { connect } from 'react-redux'
import TemplateSearch from '../components/TemplatesPanel/TemplateSearch'

const mapStateToProps = (state) => {
  return {
    nodeTemplate: state.nodeTemplate,
    nodeTemplates: state.nodeTemplates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const TemplateSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateSearch)

export default TemplateSearchContainer