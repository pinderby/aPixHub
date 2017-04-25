import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import './NodeInstance.css'
// import NodeName from './NodeName.js';
// import InfoBox from './InfoBox.js';
// import MediaSection from './MediaSection.js';
// import ReviewsSection from './ReviewsSection.js';
// import TagsSection from './TagsSection.js';
// import logan from '../logan.json';

class NodeInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
    };
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
        {Helpers.renderProps(this.props.node)}
      </div>
    );
  }
}



export default NodeInstance;