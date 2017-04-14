import { connect } from 'react-redux'
import { addProp } from '../actions'
import ApixTemplate from '../components/ApixTemplate'

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

const ApixTemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApixTemplate)

export default ApixTemplateContainer