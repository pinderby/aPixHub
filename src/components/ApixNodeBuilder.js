import React, { Component } from 'react';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyInput from './PropertyInput';
import './ApixNodeBuilder.css';
import { initializeNode, addProp, setProp, removeProp } from '../actions';

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
      props.dispatch(initializeNode(node));
    }

    // Set initial state (TODO --DM-- Remove?)
    this.state = {
      node: props.node,
      addProperty: "",
    };
  }
  
  renderProperties() {
    const nodeProps = this.props.node.properties;
    const _this = this;
    var props = [];
    for (var key in nodeProps) {
      console.log('key, prop: ', key, nodeProps[key]); //TODO --DM-- Remove
      var prop = nodeProps[key];
      props.push(<PropertyInput key={key} index={1} prop={prop} onClick={(prop) => _this.removeProperty(prop)}
                         addProperty={() => _this.addProperty()} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)
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

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // const props = this.state.node.properties.slice();
    var prop = { label:"", display_label:"", type:"string", 
            placeholder:"Enter field name here", disabled:false, path:"properties.newProp" };
    // var node = Object.assign({}, this.state.node);
    // node.properties.push(prop);
    // this.setState({
    //   node: node,
    //   addProperty: "disabled",
    // });
    this.props.dispatch(addProp(prop.path, prop));
    return;
  }

  setProperty(newProp, index) {
    var props = this.state.node.properties.slice();
    props[index] = newProp;
    var node = Object.assign({}, this.state.node);
    node.properties = props;
    this.setState({
      node: node,
      addProperty: "",
    });

    // console.log("setProperty: ", newProp); TODO --DTM-- Remove
    // console.log("props: ", this.state.props[props.length-1]); 
  }

  removeProperty(prop) {
    var props = this.state.node.properties.slice();

    var index = Helpers.getIndexInArray(props, prop);
    console.log(props, prop, index);
    props.splice(index, 1);
    var node = Object.assign({}, this.state.node);
    node.properties = props;

    this.setState({
      node: node,
      addProperty: "",
    });
    return;
  }
  
  render() {
    var node = logan;

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

class AddPropertyButton extends React.Component {
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