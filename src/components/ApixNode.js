import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';
import './ApixNode.css'
import NodeName from './NodeName.js';
import NodeProfileImage from './NodeProfileImage.js';
import NodeCoverImage from './NodeCoverImage.js';
import NodeProperty from './NodeProperty.js';
import InfoBox from './InfoBox.js';
import Section from './Section.js';
import MediaSection from './MediaSection.js';
import VideosSection from './VideosSection.js';
import ImagesSection from './ImagesSection.js';
import ReviewsSection from './ReviewsSection.js';
import TagsSection from './TagsSection.js';
import logan from '../logan.json';

class ApixNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
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
          // here you can use the result of promiseB
          console.log('Response', result);
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

  renderNodes() {
    var nodes = [];
    this.state.nodes.forEach(function (node) {
      console.log('node', node);
      nodes.push(
        <div id="apix-node-container">
          <div id="apix-node">
            {Helpers.renderTemplate(node.properties)}
            {/*<NodeName name={node.name} />
            <InfoBox node={node} />
            <MediaSection node={node} />
            <ReviewsSection reviews={node.user_reviews} />
            {Helpers.renderSections(node.sections)}*/}
          </div>
        </div>
      );
    });
    return nodes;
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




export default ApixNode;