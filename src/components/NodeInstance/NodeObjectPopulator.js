import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import PropertyBuilder from '../NodeTemplate/PropertyBuilder';
import { AddPropertyButton } from '../NodeTemplate/TemplateBuilder.js';
import { updateNode, addProp, setProp, removeProp, renameProp } from '../../actions';

class NodeObjectPopulator extends Component {
  constructor(props) {
    super(props);

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    this.state = {
      node: props.node,
      rootPath: props.path+'.properties',
      newPropIndex: 0,
      rerender: true,
    };
  }

  componentDidMount() {
    // If object doesn't have 'properties', add it with initial values
    const object = Helpers.getObjProp(this.props.node, this.props.path);
    if (!object.hasOwnProperty('properties')) this.addProperty();
  }
  
  renderProperties() {
    // Initialize variables
    const object = Helpers.getObjProp(this.props.node, this.props.path);
    var props = [];
    let i = 0;

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

  // Decide whether or not to rerender
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.rerender;
  }

  updateNode(node) {
    // Dispatch new node to store
    this.props.dispatch(updateNode(node));
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // Get index for new property
    let i = this.state.newPropIndex;

    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);
    
    // Initialize new property
    var prop = Helpers.getNewProp(i, this.props.path);

    // Update node with new property
    node = Helpers.setObjProp(node, prop.path, prop);

    console.log('addProperty() node:', node); // TODO --DM-- Remove

    // Increment new property index
    i++;

    // Set state for updated node and new property index and rerender
    this.setState({
      node: node,
      newPropIndex: i,
      rerender: true,
    });

    // Dispatch new property to store
    this.updateNode(node);

    return;
  }

  setProperty(changeType, oldPath, newPath, newProp) {
    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    // Update node with new property value
    node = Helpers.setObjProp(node, newPath, newProp);

    // If oldPath exists, remove old property
    if (oldPath) node = Helpers.removeObjProp(node, oldPath);

    // Rerender if type changed, not if label changed
    var rerender = true;
    if (changeType === 'label') rerender = false;

    // Set state for updated node and rerender if type changed
    this.setState({
      node: node,
      rerender: rerender,
    });

    return;
  }

  removeProperty(path) {
    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    // Dispatch path to store to remove property
    node = Helpers.removeObjProp(node, path);

    // Dispatch updated node to store
    this.props.dispatch(updateNode(node));

    // Set state for updated node and rerender
    this.setState({
      node: node,
      rerender: true,
    });

    return;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // Get name of parent object for display
    var objectName = this.state.rootPath.split('.');
    objectName = objectName[objectName.length-2].toUpperCase();

    return (
      <div className="node-object-builder-container">
        <div className="node-object-builder">
          <h3>{objectName}</h3>
          {this.renderProperties()}
          <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
        </div>
      </div>
    );
  }
}

export default NodeObjectPopulator;