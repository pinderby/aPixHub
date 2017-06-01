import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import { Link } from 'react-router-dom';
import './TemplateSearch.css';
import LoadingOverlay from '../LoadingOverlay';
import { fetchRelationshipTemplate, fetchDeleteRelationshipTemplate } from '../../actions/templates';

class RelationshipTemplate extends Component {
  constructor(props) {
    super(props);

    // If relationshipTemplate doesn't exist, query it from server
    if (!props.relationshipTemplate.template) {
      this.getRelationshipTemplate(props.match.params.rel_template_id);
      this.state = {
        relationshipTemplate: { isFetching: true },
      };
      return;
    }
  }

  getRelationshipTemplate(templateId) {
    // Dispatch fetchTemplate to get template by id
    this.props.dispatch(fetchRelationshipTemplate(templateId));
  }

  deleteTemplate(templateId) {
    // Dispatch fetchDeleteTemplate to delete template by id
    this.props.dispatch(fetchDeleteRelationshipTemplate(templateId));
  }

  render() {  
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // If template exists, generate template panel
    let templatePanel = "";
    if (this.props.relationshipTemplate.template) {
      // Initialize template and display label
      let template = this.props.relationshipTemplate.template, 
      displayLabel = Helpers.capitalizeFirstLetter(template['rel_type']);

      templatePanel =
        <div className="apix-template">
          <div className="panel-heading">
            <h3 className="panel-title template-label">{template.rel_type}</h3>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <Link key={template['id']+'-edit'} to={"/t/"+template['rel_type']+"/edit" }>Edit Template</Link>
                <br />
                <Link key={template['id']+'-add'} to={"/n/"+template['rel_type']+"/add" }>Add {displayLabel}</Link>
                <br />
                <Link key={template['id']+'-search'} to={"/n/"+template['rel_type']+"/search" }>Search {displayLabel}</Link>
                <br />
                <a key={template['id']+'-delete'} onClick={() => this.deleteTemplate(template.id)} >Delete {displayLabel}</a>
              </div>
              {Helpers.renderTemplateRels(template)}
            </div>
          </div>
        </div>
      
      console.log('Template:', template);
    }

    return (
      <div className="template-container">
        <LoadingOverlay show={this.props.relationshipTemplate.isFetching} />
        {templatePanel}
      </div>
    );
  }
}



export default RelationshipTemplate;