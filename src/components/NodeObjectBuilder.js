import React, { Component } from 'react';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyBuilder from './PropertyBuilder';
import { AddPropertyButton } from './ApixNodeBuilder.js';
import { updateNodeTemplate, addProp, setProp, removeProp, renameProp } from '../actions';

class NodeObjectBuilder extends Component {
  constructor(props) {
    super(props);

    // Bind callbacks
    this.updateNodeTemplate = this.updateNodeTemplate.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    this.state = {
      nodeTemplate: props.nodeTemplate,
      object: Helpers.getObjProp(props.nodeTemplate, props.path),
      rootPath: props.path+'.properties',
      newPropIndex: 0,
      rerender: true
    };
  }

  componentDidMount() {
    // If object doesn't have 'properties', add it with initial values
    const object = Helpers.getObjProp(this.props.nodeTemplate, this.props.path);
    if (!object.hasOwnProperty('properties')) this.addProperty();
  }

  // Decide whether or not to rerender
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.rerender;
  }

  updateNodeTemplate(nodeTemplate) {
    // Dispatch new node to store
    this.props.dispatch(updateNodeTemplate(nodeTemplate));
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // Get index for new property
    let i = this.state.newPropIndex;

    // Merge template from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate, this.state.nodeTemplate);
    
    // Initialize new property
    var prop = Helpers.getNewProp(i, this.props.path);

    // Update template with new property
    nodeTemplate = Helpers.setObjProp(nodeTemplate, prop.path, prop);

    console.log('addProperty() nodeTemplate:', nodeTemplate); // TODO --DM-- Remove

    // Increment new property index
    i++;

    // Set state for updated node and new property index and rerender
    this.setState({
      nodeTemplate: nodeTemplate,
      newPropIndex: i,
      rerender: true,
    });

    // Dispatch new property to store
    this.updateNodeTemplate(nodeTemplate);

    return;
  }

  setProperty(changeType, oldPath, newPath, newProp) {
    // Merge template from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate, this.state.nodeTemplate);

    // Update template with new property value
    nodeTemplate = Helpers.setObjProp(nodeTemplate, newPath, newProp);

    // If oldPath exists, remove old property
    if (oldPath) nodeTemplate = Helpers.removeObjProp(nodeTemplate, oldPath);

    // Rerender if type changed, not if label changed
    var rerender = true;
    if (changeType === 'label') rerender = false;

    // Set state for updated node and rerender if type changed
    this.setState({
      nodeTemplate: nodeTemplate,
      rerender: rerender,
    });

    return;
  }

  removeProperty(path) {
    // Merge template from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate, this.state.nodeTemplate);

    // Dispatch path to store to remove property
    nodeTemplate = Helpers.removeObjProp(nodeTemplate, path);

    // Dispatch updated node to store
    this.props.dispatch(updateNodeTemplate(nodeTemplate));

    // Set state for updated node and rerender
    this.setState({
      nodeTemplate: nodeTemplate,
      rerender: true,
    });

    return;
  }

    renderProperties() {
    // Initialize variables
    const object = Helpers.getObjProp(this.props.nodeTemplate, this.props.path);
    var props = [];
    let i = 0;

    // If object is JSON string, parse to object
    if (object.value_type && object.value_type[0] === '{') {
      // Convert string to JSON string
      let objString = object.value_type.replace(/=>/g, ":");

      // Set value_type to 'object', initialize properties
      object.value_type = 'object';
      object.properties = {};

      // Parse string to object
      let props = JSON.parse(objString);

      // Iterate over properties and assign each property
      Object.keys(props).forEach(function(key) {
        // If is an array, stringify array into proper format, otherwise assign value
        let value;
        if (Object.prototype.toString.call( props[key] ) === '[object Array]' ) {
          value = JSON.stringify(props[key]);
        } else {
          value = props[key];
        }

        // Assign properties
        object.properties[key] = {
          key: key,
          value_type: value
        };
      });
    }

    // Iterate through node properties
    for (var key in object.properties) {
      // Initialize prop
      var prop = object.properties[key];

      // Push property input for each prop
      props.push(<PropertyBuilder key={key} index={i} prop={prop} nested={true}
                        onClick={(path) => this.removeProperty(path)}
                        addProperty={() => this.addProperty()} 
                        onChange={(changeType, oldPath, newPath, prop) => this.setProperty(changeType, oldPath, newPath, prop)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <div className="node-object-builder-container">
        <div className="node-object-builder">
          <h3>{this.state.object.key.toUpperCase()}</h3>
          {this.renderProperties()}
          <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
        </div>
      </div>
    );
  }
}

export default NodeObjectBuilder;