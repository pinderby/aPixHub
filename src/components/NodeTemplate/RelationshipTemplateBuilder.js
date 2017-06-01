import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import _ from 'lodash';
import PropertyBuilder from './PropertyBuilder';
import './TemplateBuilder.css';
import { fetchRelationship, updateRelationshipTemplate, fetchPostRelationship, fetchPutRelationship } from '../../actions/templates';
import BaseModel from '../../constants/BaseModel.js';
import LoadingOverlay from '../LoadingOverlay';

class RelationshipTemplateBuilder extends Component {
  constructor(props) {
    super(props);

    // Get path url
    let splitUrlPath = this.props.match.url.split("/");

    // Determine if use if creating a new template or editing an existing one
    let relationshipTemplate, creating = (splitUrlPath[splitUrlPath.length-1] === "add");

    // If relationshipTemplate doesn't exist, query it from server
    if (!props.relationshipTemplate && !creating) {
      // TODO --DM-- Implement getting relationship and setting state
      // this.getRelationshipTemplate(props.match.params.id);
      // this.state = {
      //   relationshipTemplate: { isFetching: true },
      //   newPropIndex: 0,
      //   rerender: true,
      //   creating: creating
      // };
      return;
    }

    // Initialize template
    if (creating) {
      // If creating, create new template with label and properties
      relationshipTemplate = { rel_type:'', properties: []} // TODO --DM-- Add key, base model props
    } else {
      // If editing, assign template from props
      relationshipTemplate = props.relationshipTemplate;
    }
      
    // Get template properties
    let properties = relationshipTemplate.properties ? relationshipTemplate.properties : [];

    // If creating, add mandatory name, profile_image, cover_image properties
    if (creating) {
      // Add mandatory rel_type property
      properties.push({ key:"rel_type", display_label:"Relationship Type", value_type:"string", 
                        placeholder:"Relationship Type", disabled: false, path:'rel_type' });

      // Add mandatory from_node_id property
      properties.push({ key:"from_node_id", display_label:"From Node", value_type:"node", 
                        placeholder:"Node", disabled: false, path:'from_node_id' });

      // Add mandatory to_node_id property
      properties.push({ key:"to_node_id", display_label:"To Node", value_type:"node", 
                        placeholder:"Node", disabled: false, path:'to_node_id' });
    }

    // Bind callbacks
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    this.state = {
      relationshipTemplate: relationshipTemplate,
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
    this.props.dispatch(updateRelationshipTemplate(this.state.relationshipTemplate));
  }

  // Update state with props if template exists
  componentWillReceiveProps(nextProps) {
    if (nextProps.relationshipTemplate.template) {
        this.setState({
        relationshipTemplate: nextProps.relationshipTemplate,
        newPropIndex: nextProps.relationshipTemplate.template.properties.length
      });
    }
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // Get index for new property
    let i = this.state.newPropIndex;

    // Merge template from props (redux store) and state
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate.template, this.state.relationshipTemplate);
    
    // Initialize new property
    var prop = Helpers.getNewProp(i);

    // Update node with new property
    relationshipTemplate = Helpers.addObjProp(relationshipTemplate, prop.path, prop);

    console.log('addProperty() i:', i); // TODO --DM-- Remove
    console.log('addProperty() relationshipTemplate:', relationshipTemplate); // TODO --DM-- Remove

    // Increment new property index
    i++;

    // Set state for updated node and new property index and rerender
    this.setState({
      relationshipTemplate: relationshipTemplate,
      newPropIndex: i,
      rerender: true,
    });

    // Dispatch new property to store
    this.updateRelationshipTemplate(relationshipTemplate);

    return;
  }

  setProperty(changeType, oldPath, newPath, newProp) {
    // Merge node from props (redux store) and state
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate.template, this.state.relationshipTemplate);

    // Update template with new property value
    relationshipTemplate = Helpers.setObjProp(relationshipTemplate, newPath, newProp);

    // If oldPath exists, remove old property
    if (oldPath && oldPath !== newPath) relationshipTemplate = Helpers.removeObjProp(relationshipTemplate, oldPath);

    // Rerender if type changed, not if key changed
    var rerender = true;
    if (changeType === 'key') rerender = false;

    // Set state for updated relationship and rerender if type changed
    this.setState({
      relationshipTemplate: relationshipTemplate,
      rerender: rerender,
    });

    return;
  }

  removeProperty(path) {
    // Merge node from props (redux store) and state
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate.template, this.state.relationshipTemplate);

    // Dispatch path to store to remove property
    relationshipTemplate = Helpers.removeObjProp(relationshipTemplate, path);

    // Dispatch updated node to store
    this.props.dispatch(updateRelationshipTemplate(relationshipTemplate));

    // Set state for updated relationship and rerender
    this.setState({
      relationshipTemplate: relationshipTemplate,
      rerender: true,
    });

    return;
  }

  submitTemplate() {
    // Merge node from props (redux store) and state
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate.template, this.state.relationshipTemplate);

    let dispatch = this.props.dispatch, payload = {};
    payload.rel_type = relationshipTemplate.rel_type;
    payload.from_node_id = relationshipTemplate.from_node_id;
    payload.to_node_id = relationshipTemplate.to_node_id;
    payload.properties = {};

    console.log('submitTemplate() relationship: ', relationshipTemplate); // TODO --DM-- Remove

    // Generate template payload
    for(var propKey in relationshipTemplate.properties) {
      let prop = relationshipTemplate.properties[propKey];
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
      dispatch(fetchPostRelationship(payload));
    } else {
      dispatch(fetchPutRelationship(relationshipTemplate.id, payload));
    }
  }

  getTemplate(relationshipId) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchRelationship(relationshipId));
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

export default RelationshipTemplateBuilder;