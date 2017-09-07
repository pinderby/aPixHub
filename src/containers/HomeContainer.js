import { connect } from 'react-redux'
import Home from '../components/Home/Home';

const mapStateToProps = (state) => {
  return {
    // TODO --DM-- Fill in
    // user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer