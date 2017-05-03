import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import './NodeInstance.css'
import { updateNode, fetchNode } from '../../actions/nodes';
import { fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';
// import NodeName from './NodeName.js';
// import InfoBox from './InfoBox.js';
// import MediaSection from './MediaSection.js';
// import ReviewsSection from './ReviewsSection.js';
// import TagsSection from './TagsSection.js';
// import logan from '../logan.json';

class NodeInstance extends Component {
  constructor(props) {
    super(props);

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template) {
      this.getTemplate(props.match.params.label);
      this.state = {
        nodeTemplate: { isFetching: true },
      };
    }

    // If node doesn't exist, query it from server
    if (!props.node.instance) {
      this.getNode(props.match.params.label, props.match.params.id);
      this.state = {
        node: { isFetching: true },
      };
    }

    this.state = {
      nodeTemplate: props.nodeTemplate,
      node: props.node
    };
  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  getNode(templateLabel, nodeId) {
    // Dispatch fetchNode to get node by label and id
    this.props.dispatch(fetchNode(templateLabel, nodeId));
  }

  updateNode(node) {
    // Dispatch new node to store
    this.props.dispatch(updateNode(node));
  }

  
  // componentDidMount() {
  //   var x = this;
  //   // url (required), options (optional)
  //   fetch('https://apix.rocks/nodes', {
  //     method: 'GET'
  //   }).then(function(response) {
  //     response.json().then(function(result) {
  //         // here you can use the result of promiseB
  //         console.log('Response', result);
  //         var templates = [];
  //         result.forEach(function (obj) {
  //           templates.push(obj);
  //         });
  //         x.setState({ templates: templates });
  //     });
      
  //     // this.setState({ node: });
  //   }).catch(function(err) {
  //     // Error :(
  //   });
  // }

  /*renderNodes() {
    var nodes = [];
    this.state.nodes.forEach(function (node) {
      nodes.push(
        <div id="apix-node-container">
          <div id="apix-node">
            {Helpers.renderTemplate(node.properties)}
            <NodeName name={node.name} />
            <InfoBox node={node} />
            <MediaSection node={node} />
            <ReviewsSection reviews={node.user_reviews} />
            {Helpers.renderSections(node.sections)}
          </div>
        </div>
      );
    });
    return nodes;
  }*/
  
  render() {
    // this.state.nodes.push(logan);
    console.log("this.state: ", this.state); // TODO --DM-- Remove
    console.log("this.props: ", this.props); // TODO --DM-- Remove

    let defined = ['add','search']
    if (defined.indexOf(this.props.match.params.id) > -1) {
      return null;
    }
    

    return (
      <div>
        <LoadingOverlay show={this.props.nodeTemplate.isFetching} />
        {Helpers.renderProps(this.props.node)}
      </div>
    );
  }
}



export default NodeInstance;