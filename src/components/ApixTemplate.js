import React, { Component } from 'react';
import Helpers from '../helpers.js';
import './ApixTemplate.css';
import { Link } from 'react-router-dom';
import { initializeNodeTemplate } from '../actions';

class ApixTemplate extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderTemplates = this.renderTemplates.bind(this);
    this.setNodeTemplate = this.setNodeTemplate.bind(this);

    this.state = {
      templates: [],
    };
  }

  
  componentDidMount() {
    var x = this;
    // url (required), options (optional)
    fetch('https://apix.rocks/nodes', {
      method: 'GET'
    }).then(function(response) {
      response.json().then(function(result) {
          var templates = [];
          result.forEach(function (obj) {
            templates.push(obj);
          });
          x.setState({ templates: templates });
      });
      
      // this.setState({ node: });
    }).catch(function(err) {
      // Error :(
    });
  }

  setNodeTemplate(template) {
    // Dispatch chosen template to store
    this.props.dispatch(initializeNodeTemplate(template));
  }

  renderTemplates() {
    var templates = [], setNodeTemplate = this.setNodeTemplate;
    this.state.templates.forEach(function (template, index) {
      console.log('template', template); // TODO --DM-- Remove
      templates.push(
        <div className="apix-template-container" key={template['id']+'1'}>
          <div className="apix-template" key={template['id']+'2'}>
            <div className="panel-heading" key={template['id']+'3'}>
              <Link key={template['id']+'4'} to={"/"+template['label']+"/edit"} 
                    onClick={() => setNodeTemplate(template)}>
                <h3 className="panel-title template-label" key={template['id']+'5'}>{template.label}</h3>
              </Link>
            </div>
            <div className="panel panel-default" key={template['id']+'6'}>
              <div className="panel-body" key={template['id']+'7'}>
                {Helpers.renderTemplate(template)}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return templates;
  }
  
  render() {
    // this.state.nodes.push(logan);

    return (
      <div>
        {this.renderTemplates()}
      </div>
    );
  }
}


export default ApixTemplate;