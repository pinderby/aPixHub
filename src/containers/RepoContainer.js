import { connect } from 'react-redux'
import Repo from '../components/Repo/Repo';
import test_data from  '../test_data.json'; // TODO --DTM-- Delete

const mapStateToProps = (state) => {
  return {
    user: state.user,
    // TODO --DTM-- Use real data when server is set up
    repo: test_data.repos[0],
    nodeTemplate: state.nodeTemplate,
    nodeTemplates: test_data.templates,
    nodes: state.nodes,
    settings: state.userSettings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const RepoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repo)

export default RepoContainer