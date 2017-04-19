import React, { Component } from 'react';
import Helpers from '../helpers.js';
import { Link } from 'react-router-dom';
// import './ApixTemplate.css'
import './TemplateSearch.css'

class ApixTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
    };
  }

  render() {
    // Initialize template and display label
    let template = this.props.nodeTemplate;
    let displayLabel = "";
    if (template['label']) displayLabel = Helpers.capitalizeFirstLetter(template['label']);

    console.log('Template:', template);

    return (
      <div className="apix-template-container" key={template['id']+'1'}>
        <div className="apix-template" key={template['id']+'2'}>
          <div className="panel-heading" key={template['id']+'3'}>
            <h3 className="panel-title template-label" key={template['id']+'5'}>{template.label}</h3>
          </div>
          <div className="panel panel-default" key={template['id']+'6'}>
            <div className="panel-body" key={template['id']+'7'}>
              <div className="row">
                <Link key={template['id']+'-edit'} to={"/t/"+template['label']+"/edit" }>Edit Template</Link>
                <br />
                <Link key={template['id']+'-add'} to={"/n/"+template['label']+"/add" }>Add {displayLabel}</Link>
                <br />
                <Link key={template['id']+'-search'} to={"/n/"+template['label']+"/search" }>Search {displayLabel}</Link>
              </div>
              {Helpers.renderTemplate(template)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default ApixTemplate;