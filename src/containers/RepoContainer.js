import { connect } from 'react-redux'
import Repo from '../components/Repo/Repo';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    // TODO --DTM-- Use real data when server is set up
    repo: {},
    nodeTemplates: [
      {
        "id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
        "label": "movie",
        "created_at": "2017-09-08T16:21:02.116Z",
        "updated_at": "2017-09-08T16:21:02.116Z",
        "properties": [
          {
            "id": "c60b7311-b3d8-4812-a1c1-33669b8c9c2a",
            "key": "name",
            "value_type": "string",
            "node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
            "created_at": "2017-09-08T16:21:02.026Z",
            "updated_at": "2017-09-08T16:21:02.122Z"
          }
        ],
        "in_relationships": [
          {
            "id": "80174196-958a-4038-a739-8fa17c81e480",
            "rel_type": "DIRECTED",
            "to_node_id": "3152f3c7-ebc8-4e7a-981c-11951f65bebb",
            "from_node_id": "cb8677a1-6106-4010-933d-db4522302c83",
            "created_at": "2017-09-08T16:21:02.178Z",
            "updated_at": "2017-09-08T16:21:02.178Z",
            "properties": []
          }
        ],
        "out_relationships": []
      }
    ],
    nodes: [
      {
        "properties": {
          "name": "Black Panther"
        },
        "label": "movie",
        "nid": 26
      },
      {
        "properties": {
          "name": "Avengers: Infinity War"
        },
        "label": "movie",
        "nid": 27
      },
      {
        "properties": {
          "name": "A QUIET PLACE"
        },
        "label": "movie",
        "nid": 28
      },
      {
        "properties": {
          "name": "Solo: A Star Wars Story"
        },
        "label": "movie",
        "nid": 29
      },
      {
        "properties": {
          "name": "Ready Player One"
        },
        "label": "movie",
        "nid": 30
      }
    ]
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