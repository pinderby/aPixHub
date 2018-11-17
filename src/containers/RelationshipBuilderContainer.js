import { connect } from 'react-redux'
import RelationshipTemplateBuilder from '../components/TemplatesPanel/RelationshipTemplateBuilder'

const mapStateToProps = (state) => {
  return {
    nodeTemplate: state.nodeTemplate,
    relationshipTemplate: state.relationshipTemplate,
    relationshipTemplates: state.relationshipTemplates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

const RelationshipBuilderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationshipTemplateBuilder)

export default RelationshipBuilderContainer