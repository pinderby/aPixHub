import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import _ from 'lodash';
import PropertyBuilder from './PropertyBuilder';
import './TemplateBuilder.css';
import { updateNodeTemplate, fetchTemplate, fetchPostTemplate, fetchPutTemplate } from '../../actions/templates';
import BaseModel from '../../constants/BaseModel.js';
import LoadingOverlay from '../LoadingOverlay';

class TemplateBuilder extends Component {
  constructor(props) {
    super(props);

    // Get path url
    let splitUrlPath = this.props.match.url.split("/");

    // Determine if use if creating a new template or editing an existing one
    let nodeTemplate, creating = (splitUrlPath[splitUrlPath.length-1] === "add");

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template && !creating) {
      this.getTemplate(props.match.params.label);
      this.state = {
        nodeTemplate: { isFetching: true },
        newPropIndex: 0,
        rerender: true,
        creating: creating
      };
      return;
    }

    // Initialize template
    if (creating) {
      // If creating, create new template with label and properties
      nodeTemplate = { label:'', template: { properties: [] }} // TODO --DM-- Add key, base model props
    } else {
      // If editing, assign template from props
      nodeTemplate = props.nodeTemplate;
    }
      
    // Get template properties
    let properties = nodeTemplate.template.properties ? nodeTemplate.template.properties : [];

    // TODO --DTM-- Delete
    // // If creating, add mandatory name, profile_image, cover_image properties
    // if (creating) {
    //   // Add mandatory name property
    //   properties.push({ key:"name", display_label:"Name", value_type:"string", 
    //                     placeholder:"Name", disabled: true,path:'properties.name' });

    //   // Add mandatory profile_image property
    //   properties.push( { key:"profile_image", display_label:"Profile Picture", 
    //                      value_type:"string", placeholder:"Link to Profile Picture", 
    //                      disabled: true,path:'properties.profile_image' });

    //   // Add mandatory cover_image property
    //   properties.push({ key:"cover_image", display_label:"Cover Image", 
    //                     value_type:"string", placeholder:"Link to Cover Image", 
    //                     disabled: true, path:'properties.cover_image' });
    // }

    // Bind callbacks
    this.updateNodeTemplate = this.updateNodeTemplate.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    this.state = {
      nodeTemplate: nodeTemplate,
      newPropIndex: properties.length,
      rerender: true,
      creating: creating
    };
  }

  // Decide whether or not to rerender
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.rerender;
  }

  componentDidMount() {
    // Dispatch new node to store after component mounts
    this.props.dispatch(updateNodeTemplate(this.state.nodeTemplate));
  }

  // Update state with props if template exists
  componentWillReceiveProps(nextProps) {
    if (nextProps.nodeTemplate.template) {
        this.setState({
        nodeTemplate: nextProps.nodeTemplate,
        newPropIndex: nextProps.nodeTemplate.template.properties.length
      });
    }
  }

  updateNodeTemplate(nodeTemplate) {
    // Dispatch new node to store
    this.props.dispatch(updateNodeTemplate(nodeTemplate));
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // Get index for new property
    let i = this.state.newPropIndex;

    // Merge template from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate.template, this.state.nodeTemplate);
    
    // Initialize new property
    var prop = Helpers.getNewProp(i);

    // Update node with new property
    nodeTemplate = Helpers.addObjProp(nodeTemplate, prop.path, prop);

    console.log('addProperty() i:', i); // TODO --DM-- Remove
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
    // Merge node from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate.template, this.state.nodeTemplate);
    
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

    // Update template with new property value
    nodeTemplate = Helpers.setObjProp(nodeTemplate, newPath, newProp);

    // If oldPath exists, remove old property
    if (oldPath && oldPath !== newPath) nodeTemplate = Helpers.removeObjProp(nodeTemplate, oldPath);

    // Rerender if type changed, not if key changed
    var rerender = true;
    if (changeType === 'key') rerender = false;

    // Set state for updated node and rerender if type changed
    this.setState({
      nodeTemplate: nodeTemplate,
      rerender: rerender,
    });

    return;
  }

  removeProperty(path) {
    // Merge node from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate.template, this.state.nodeTemplate);

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

  submitTemplate() {
    // Merge node from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate.template, this.state.nodeTemplate);

    let dispatch = this.props.dispatch, payload = {};
    payload.label = nodeTemplate.label;
    payload.properties = {};

    console.log('submitTemplate(): ', nodeTemplate); // TODO --DM-- Remove

    // Generate template payload
    for(var propKey in nodeTemplate.properties) {
      let prop = nodeTemplate.properties[propKey];
      console.log('submitTemplate() prop: ', prop); // TODO --DM-- Remove
      
      // Lower case prop key
      prop.key = prop.key.toLowerCase();

      if (prop.value_type === 'object') {
        let object = {};
        for(var objProp in prop.properties) {
          object[objProp] = prop.properties[objProp].value_type;
        }
        payload.properties[prop.key] = object;
      } else {
        payload.properties[prop.key] = prop.value_type;
      }
    }

    console.log('Payload: ', payload); // TODO --DM-- Remove
    
    payload = JSON.stringify(payload).replace('"[\\', '[').replace('\\"]"', '"]');
    console.log('Payload string: ', payload); // TODO --DM-- Remove
    
    if (this.state.creating) {
      dispatch(fetchPostTemplate(payload));
    } else {
      dispatch(fetchPutTemplate(nodeTemplate.id, payload));
    }
  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  renderProperties() {
    // Initialize variables
    const templateProps = this.props.nodeTemplate.template.properties;
    var props = [];
    let i = 0;

    // Iterate through node properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];
    // templateProps.forEach(function (prop) {
      console.log("renderProps() prop:", prop);

      // Initialize path if needed
      if (!prop.path) prop.path = 'properties.'+key;

      // Initialize 'disabled' property if property is mandatory
      if (BaseModel.mandatory_fields.indexOf(prop.key) !== -1) prop.disabled = true; 
      else prop.disabled = false;

      // Push property input for each prop
      props.push(<PropertyBuilder key={key} index={i} prop={prop} nodeTemplate={this.props.nodeTemplate} 
                        dispatch={this.props.dispatch} nested={false}
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

    let templateBuilder = "";
    if (this.props.nodeTemplate.template) {
      templateBuilder = 
        <form className="form-inline">
          <label htmlFor={'label'}>Label</label>
          <LabelInput value={this.props.nodeTemplate.template.label}
            onChange={(changeType, oldPath, newPath, prop) => this.setProperty(changeType, oldPath, newPath, prop)} />
          <br /><br />
          {this.renderProperties()}
          <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
          <br /><br />
          <GetTemplateButton onClick={() => this.getTemplate()}/>
          <br /><br />
          <SubmitTemplateButton onClick={() => this.submitTemplate()}/>
        </form>
    }

    return (
      <div id="apix-node-builder-container">
        <div id="apix-node-builder">
          <LoadingOverlay show={this.props.nodeTemplate.isFetching} />
          {templateBuilder}
        </div>
      </div>
    );
  }
}

class LabelInput extends Component {
  constructor(props) {
    super(props);

    // Initialize value
    let value = '';
    if (props.value) value = props.value;

    this.state = {
      key: 'label',
      value: value,
    };
  }

  textChanged(e, onChange) {
    // Update state with new value
    this.setState({
      value: e.target.value
    });

    // Call callback
    onChange(null, null, 'label', e.target.value);
  }
  
  render() {
    return (
      <input className="form-control" type={'text'}
          id={this.state.key} value={this.state.value} placeholder={'Enter label here'}
          onChange={(e) => this.textChanged(e, this.props.onChange)} />
    );
  }
}

export class AddPropertyButton extends Component {
  render() {
    return (
      <button type="button" className="btn btn-info" disabled={this.props.disabled} onClick={() => this.props.onClick()}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Property
      </button>
    );
  }
}

export class SubmitTemplateButton extends Component {
  render() {
    return (
      <button type="button" className="btn btn-info" onClick={() => this.props.onClick()}>
        Submit Template
      </button>
    );
  }
}

export class GetTemplateButton extends Component {
  render() {
    return (
      <button type="button" className="btn btn-info" onClick={() => this.props.onClick()}>
        Get Template
      </button>
    );
  }
}

export default TemplateBuilder;