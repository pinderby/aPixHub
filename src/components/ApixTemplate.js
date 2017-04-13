import React, { Component } from 'react';
import Helpers from '../helpers.js';
import './ApixTemplate.css';

class ApixTemplate extends Component {
  constructor(props) {
    super(props);

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

  renderTemplates() {
    var templates = [];
    this.state.templates.forEach(function (template, index) {
      console.log('template', template);
      templates.push(
        <div className="apix-template-container" key={template['id']+'1'}>
          <div className="apix-template" key={template['id']+'2'}>
            <div className="panel-heading" key={template['id']+'3'}>
              <h3 className="panel-title template-label" key={template['id']+'4'}>{template.label}</h3>
            </div>
            <div className="panel panel-default" key={template['id']+'5'}>
              <div className="panel-body" key={template['id']+'6'}>
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