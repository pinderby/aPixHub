import { connect } from 'react-redux';
import RelationshipTemplate from '../components/TemplatesPanel/RelationshipTemplate.js';

const mapStateToProps = (state) => {
  return {
    relationshipTemplate: state.relationshipTemplate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const RelationshipTemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationshipTemplate)

export default RelationshipTemplateContainer