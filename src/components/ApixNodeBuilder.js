import React, { Component } from 'react';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyInput from './PropertyInput';
import './ApixNodeBuilder.css';
import { updateNode, addProp, setProp, removeProp, renameProp } from '../actions'; // TODO --DM-- Remove all except updateNode()?

class ApixNodeBuilder extends Component {
  constructor(props) {
    super(props);
    
    // Check if node is already initialized
    if (!props.node.hasOwnProperty('label')) {
      
      // Create new node with label
      let node = { label:'', properties: {}} // TODO --DM-- Add label, base model props
      
      // Get node properties
      let properties = node.properties;
      
      // Add mandatory name property
      properties.name = { label:"name", 
                          display_label:"Name", 
                          type:"string", 
                          placeholder:"Name", 
                          disabled: true,
                          path:'properties.name' };
      
      // Add mandatory profile_image property
      properties.profile_image = {  label:"profile_image", 
                                    display_label:"Profile Picture", 
                                    type:"string", 
                                    placeholder:"Link to Profile Picture", 
                                    disabled: true,
                                    path:'properties.profile_image' };
      
      // Add mandatory cover_image property
      properties.cover_image = {  label:"cover_image", 
                                  display_label:"Cover Image", 
                                  type:"string", 
                                  placeholder:"Link to Cover Image", 
                                  disabled: true,
                                  path:'properties.cover_image' };

      // Dispatch new node to store
      props.dispatch(updateNode(node));
    }

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    console.log('props.node', props.node); // TODO --DM-- Remove
    this.state = {
      node: props.node,
      newPropIndex: 0,
      rerender: true,
    };
  }
  
  renderProperties() {
    // Initialize variables
    const nodeProps = this.props.node.properties;
    var props = [];
    let i = 0;

    // Iterate through node properties
    for (var key in nodeProps) {
      // Initialize prop
      var prop = nodeProps[key];

      // Push property input for each prop
      props.push(<PropertyInput key={key} index={i} prop={prop} node={this.props.node} dispatch={this.props.dispatch}
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
    var prop = Helpers.getNewProp(i);

    // Update node with new property
    node = Helpers.setObjProp(node, prop.path, prop);

    console.log('addProperty() i:', i); // TODO --DM-- Remove
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
    
    // TODO --DM-- Remove?
    // // Check for oldPath: True: rename property, False: set property
    // if (!oldPath) {
    //   // If no oldPath, dispatch new property value to store
    //   this.props.dispatch(setProp(newPath, newProp));
    // } else {
    //   // If oldPath exists, dispatch RENAME_PROPERTY to
    //   // (1) remove old property and (2) set new property
    //   this.props.dispatch(renameProp(oldPath, newPath, newProp));
    // }

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
    console.log('removeProp node: ', node);

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
    console.log('this.state.node', this.state.node); // TODO --DM-- Remove
    console.log('this.props.node', this.props.node); // TODO --DM-- Remove

    return (
      <div id="apix-node-builder-container">
        <div id="apix-node-builder">
          <form className="form-inline">
            {this.renderProperties()}
            <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
          </form>
        </div>
      </div>
    );
  }
}

export class AddPropertyButton extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-info" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Property
      </button>
    );
  }
}


export default ApixNodeBuilder;