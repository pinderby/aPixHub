import React, { Component } from 'react';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyInput from './PropertyInput';
import './ApixNodeBuilder.css';
import { updateNode, addProp, setProp, removeProp, renameProp } from '../actions';

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
      properties.profile_image = { label:"profile_image", 
                              display_label:"Profile Picture", 
                              type:"string", 
                              placeholder:"Link to Profile Picture", 
                              disabled: true,
                              path:'properties.profile_image' };
      
      // Add mandatory cover_image property
      properties.cover_image = { label:"cover_image", 
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

    // Set initial state (TODO --DM-- Remove?)
    console.log('props.node', props.node); // TODO --DM-- Remove
    this.state = {
      node: props.node,
      addProperty: "",
      newPropIndex: 0,
    };
  }
  
  renderProperties() {
    const nodeProps = this.props.node.properties;
    var props = [];
    let i = 0
    for (var key in nodeProps) {
      console.log('key, prop: ', key, nodeProps[key]); //TODO --DM-- Remove
      var prop = nodeProps[key];
      props.push(<PropertyInput key={key} index={i} prop={prop} 
                        onClick={(path) => this.removeProperty(path)}
                        addProperty={() => this.addProperty()} 
                        onChange={(oldPath, newPath, prop) => this.setProperty(oldPath, newPath, prop)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)
      i++;
    }
    /*nodeProps.forEach(function(prop, index, propsArray) {
      if (index === nodeProps.length-1) {
        props.push(<PropertyInput key={index} index={index} prop={prop} 
                        onClick={(prop) => _this.removeProperty(prop)} onChange={(prop, i) => _this.setProperty(prop, i)}
                        addProperty={() => _this.addProperty()}  />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      } else if(prop) {
        props.push(<PropertyInput key={index} index={index} prop={prop} onClick={(prop) => _this.removeProperty(prop)}
                         addProperty={() => _this.addProperty()} />); // TODO --DM-- manage keys for iteration
        props.push(<br key={index+1000} />);
      }
      
    });*/
    return props;
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
    var prop = { label:"", display_label:"", type:"string", 
            placeholder:"Enter field name here", disabled:false, path:"properties.newProp"+i };

    // Dispatch new property to store
    // this.props.dispatch(addProp(prop.path, prop)); // TODO --DM-- Figure out when to call this

    // Update node with new property
    node = Helpers.setObjProp(node, prop.path, prop);

    console.log('addProperty() i:', i); // TODO --DM-- Remove
    console.log('addProperty() node:', node); // TODO --DM-- Remove

    // Increment new property index
    i++;

    // Set state for updated node and new property index
    this.setState({
      node: node,
      newPropIndex: i,
    });

    // Dispatch new property to store
    this.props.dispatch(updateNode(node)); 

    return;
  }

  setProperty(oldPath, newPath, newProp) {
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

    // Set state for updated node
    // this.setState({
    //   node: node,
    // });

    return;
  }

  removeProperty(path) {
    // Dispatch path to store to remove property
    this.props.dispatch(removeProp(path));

    return;
  }
  
  render() {
    var node = logan;
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