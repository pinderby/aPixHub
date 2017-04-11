import React, { Component } from 'react';
import Helpers from '../helpers.js';
import PropertyPopulator from './PropertyPopulator';
import './ApixNodeBuilder.css';
import { updateNode, addProp, setProp, removeProp, renameProp } from '../actions'; // TODO --DM-- Remove all except updateNode()?
import BaseModel from '../constants/BaseModel.js';

class ApixNodePopulator extends Component {
  constructor(props) {
    super(props);

    // Initialize node
    let nodeTemplate = props.nodeTemplate;
    let node = props.node;

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.setProperty = this.setProperty.bind(this);

    console.log('props.node', props.node); // TODO --DM-- Remove
    console.log('props.node', props.nodeTemplate); // TODO --DM-- Remove
    this.state = {
      nodeTemplate: props.nodeTemplate,
      node: props.node,
    };
  }
  
  renderProperties() {
    // Initialize variables
    const templateProps = this.props.nodeTemplate.properties;
    var props = [];
    let i = 0;

    // Iterate through template properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];

      // Initialize path if needed
      if (!prop.path) prop.path = 'properties.'+key;

      // Push property input for each prop
      props.push(<PropertyPopulator key={key} index={i} prop={prop} node={this.props.node} 
                        nodeTemplate={this.props.nodeTemplate} dispatch={this.props.dispatch} nested={false}
                        onChange={(path, value) => this.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }

  updateNode(node) {
    // Dispatch new node to store
    this.props.dispatch(updateNode(node));
  }

  setProperty(path, newValue) {
    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    // Update node with new property value
    node = Helpers.setObjProp(node, path, newValue);

    // Set state for updated node
    this.setState({
      node: node
    });

    return;
  }
  
  render() {
    console.log('this.state.node', this.state.node); // TODO --DM-- Remove
    console.log('this.props.node', this.props.node); // TODO --DM-- Remove

    return (
      <div id="apix-node-populator-container">
        <div id="apix-node-populator">
          <form className="form-inline">
            {this.renderProperties()}
          </form>
        </div>
      </div>
    );
  }
}

export default ApixNodePopulator;