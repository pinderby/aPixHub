import { connect } from 'react-redux'
import App from '../App'

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

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer