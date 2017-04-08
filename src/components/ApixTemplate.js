import React, { Component } from 'react';
import Helpers from '../helpers.js';

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
        <div id="apix-template-container" key={template['id']+'1'}>
          <div id="apix-template" key={template['id']+'2'}>
            {Helpers.renderTemplate(template)}
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