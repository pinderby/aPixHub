import { connect } from 'react-redux'
import { addProp } from '../actions'
import TemplateSearch from '../components/TemplateSearch'

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

const TemplateSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateSearch)

export default TemplateSearchContainer