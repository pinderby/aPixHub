import { connect } from 'react-redux'
import Profile from '../components/Home/Profile';

const mapStateToProps = (state) => {
  return {
    // TODO --DM-- Fill in
    // user: state.user
    nodes: state.nodes,
    node: state.node,
    nodeTemplate: state.nodeTemplate,
    nodeLabel: state.nodeTemplate.label
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer