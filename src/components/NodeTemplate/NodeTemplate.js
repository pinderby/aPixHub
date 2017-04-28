import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import { Link } from 'react-router-dom';
// import './NodeTemplate.css'
import './TemplateSearch.css';
import LoadingOverlay from '../LoadingOverlay';
import { fetchTemplate } from '../../actions/templates';

class NodeTemplate extends Component {
  constructor(props) {
    super(props);

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template) {
      this.getTemplate(props.match.params.id);
      this.state = {
        nodeTemplate: { isFetching: true },
      };
      return;
    }
  }

  getTemplate(templateId) {
    // Dispatch fetchTemplate to get template by id
    this.props.dispatch(fetchTemplate(templateId));
  }

  render() {  
    // If template exists, generate template panel
    let templatePanel = "";
    if (this.props.nodeTemplate.template) {
      // Initialize template and display label
      let template = this.props.nodeTemplate.template, 
      displayLabel = Helpers.capitalizeFirstLetter(template['label']);

      templatePanel =
        <div className="apix-template">
          <div className="panel-heading">
            <h3 className="panel-title template-label">{template.label}</h3>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <Link key={template['id']+'-edit'} to={"/t/"+template['id']+"/edit" }>Edit Template</Link>
                <br />
                <Link key={template['id']+'-add'} to={"/n/"+template['id']+"/add" }>Add {displayLabel}</Link>
                <br />
                <Link key={template['id']+'-search'} to={"/n/"+template['label']+"/search" }>Search {displayLabel}</Link>
              </div>
              {Helpers.renderTemplate(template)}
            </div>
          </div>
        </div>
      
      console.log('Template:', template);
    }

    return (
      <div className="apix-template-container">
        <LoadingOverlay show={this.props.nodeTemplate.isFetching} />
        {templatePanel}
      </div>
    );
  }
}



export default NodeTemplate;