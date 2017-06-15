import { connect } from 'react-redux';
import RelationshipInstancePopulator from '../components/NodeInstance/RelationshipInstancePopulator.js';

const mapStateToProps = (state) => {
  return {
    relationshipTemplate: state.relationshipTemplate,
    relationship: state.relationship,
    relationshipLabel: state.relationshipTemplate.label
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const RelationshipPopulatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationshipInstancePopulator)

export default RelationshipPopulatorContainer