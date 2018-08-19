import { connect } from 'react-redux'
import Repo from '../components/Repo/Repo';
import test_data from  '../test_data.json'; // TODO --DTM-- Delete

const mapStateToProps = (state) => {
  return {
    user: state.user,
    repo: state.repo,
    nodeTemplate: state.nodeTemplate,
    nodeTemplates: state.nodeTemplates,
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