import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import _ from 'lodash';
import PropertyBuilder from './PropertyBuilder';
import PropertyInput from '../PropertyInput';
import './TemplateBuilder.css';
import { fetchRelationshipTemplate, updateRelationshipTemplate, fetchPostRelTemplate, fetchPutRelTemplate } from '../../actions/templates';
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
    if (!props.relationshipTemplate.template && !creating) {
      // TODO --DM-- Implement getting relationship and setting state
      this.getRelationshipTemplate(props.match.params.rel_template_id);
      this.state = {
        relationshipTemplate: { isFetching: true },
        newPropIndex: 0,
        rerender: true,
        creating: creating
      };
      return;
    }

    // Initialize template
    if (creating || !props.relationshipTemplate.template) {
      // If creating, create new template with label and properties
      relationshipTemplate = { rel_type:'', template: { properties: [] } }  // TODO --DM-- Add key, base model props
    } else {
      // If editing, assign template from props
      relationshipTemplate = props.relationshipTemplate;
    }

    // Get template properties
    let properties = relationshipTemplate.template.properties ? relationshipTemplate.template.properties : [];

    // Add mandatory fields
    relationshipTemplate.template = this.addMandatoryFields(relationshipTemplate.template);

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
      nextProps.relationshipTemplate.template = this.addMandatoryFields(nextProps.relationshipTemplate.template);
      this.setState({
        relationshipTemplate: nextProps.relationshipTemplate,
        newPropIndex: nextProps.relationshipTemplate.template.properties.length
      });
    }
  }

  addMandatoryFields(template) {
    let nextTemplate = Object.assign({}, template);
    
    // Add mandatory rel_type property
    // TODO --DM-- DELETE???
    // if(!template.rel_type || typeof(template.rel_type) !== '[object Object]') {
    //   nextTemplate.rel_type = { key:"rel_type", display_label:"Relationship Type", value_type:"string", 
    //                   placeholder:"Relationship Type", disabled: false, path:'rel_type' };
    //   if(template.rel_type && (typeof(template.rel_type) === 'string')) nextTemplate.rel_type.value = template.rel_type;
    // }

    if(!template.rel_type || typeof(template.rel_type) !== 'string') {
      nextTemplate.rel_type = "";
      if(template.rel_type && (typeof(template.rel_type) === 'string')) nextTemplate.rel_type = template.rel_type;
    }
    
    // Add mandatory from_node_id property
    if(!template.from_node_id) {
      nextTemplate.from_node_id = { key:"from_node_id", display_label:"From Node", value_type:"node", 
                      placeholder:"Node", disabled: false, path:'from_node_id' };
    } else {
      if(typeof(template.from_node_id) === 'string') {
        nextTemplate.from_node_id = { key:"from_node_id", display_label:"From Node", value_type:"node", 
                        value: template.from_node_id, placeholder:"Node", disabled: false, path:'from_node_id' };
      }
      if(typeof(template.from_node_id) === '[object Object]') {
        nextTemplate.to_node_id.value = template.to_node_id.value;
      }
    }

    // Add mandatory to_node_id property
    if(!template.to_node_id) {
      nextTemplate.to_node_id = { key:"to_node_id", display_label:"To Node", value_type:"node", 
                      placeholder:"Node", disabled: false, path:'to_node_id' };
    } else {
      if(typeof(template.to_node_id) === 'string') {
        nextTemplate.to_node_id = { key:"to_node_id", display_label:"To Node", value_type:"node", 
                        value: template.to_node_id, placeholder:"Node", disabled: false, path:'to_node_id' };
      }
      if(typeof(template.to_node_id) === '[object Object]') {
        nextTemplate.to_node_id.value = template.to_node_id.value;
      }
    }

    return nextTemplate;
  }

  getRelationshipTemplate(relTemplateId) {
    // Dispatch fetchRelationshipTemplate to get template by id
    this.props.dispatch(fetchRelationshipTemplate(relTemplateId));
  }

  addProperty() { // TODO --DM-- handle multiple properties at one time
    // Get index for new property
    let i = this.state.newPropIndex;

    // Merge template from props (redux store) and state
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate, this.state.relationshipTemplate);
    
    // Initialize new property
    var prop = Helpers.getNewProp(i);

    // Update node with new property
    relationshipTemplate.template = Helpers.addObjProp(relationshipTemplate.template, prop.path, prop);

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
    this.props.dispatch(updateRelationshipTemplate(relationshipTemplate));

    return;
  }

  setProperty(changeType, oldPath, newPath, newProp) {
    // Merge node from props (redux store) and state
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate, this.state.relationshipTemplate);

    // Update template with new property value
    relationshipTemplate.template = Helpers.setObjProp(relationshipTemplate.template, newPath, newProp);

    // If oldPath exists, remove old property
    if (oldPath && oldPath !== newPath) relationshipTemplate.template = Helpers.removeObjProp(relationshipTemplate.template, oldPath);

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
    let relationshipTemplate = Object.assign(this.props.relationshipTemplate, this.state.relationshipTemplate);

    // Dispatch path to store to remove property
    relationshipTemplate.template = Helpers.removeObjProp(relationshipTemplate.template, path);

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
    let template = Object.assign(this.props.relationshipTemplate.template, this.state.relationshipTemplate.template);

    let dispatch = this.props.dispatch, payload = {};
    payload.rel_type = template.rel_type;
    payload.from = template.from_node_id.value;
    payload.to = template.to_node_id.value;
    payload.properties = {};

    console.log('submitTemplate() relationship: ', template); // TODO --DM-- Remove

    // Generate template payload
    for(var propKey in template.properties) {
      let prop = template.properties[propKey];
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
      dispatch(fetchPostRelTemplate(payload));
    } else {
      dispatch(fetchPutRelTemplate(template.id, payload));
    }
  }

  renderProperties() {
    // Initialize variables
    const template = this.props.relationshipTemplate.template;
    const templateProps = template.properties;
    var props = [];
    let i = 2;

    // Render mandatory fields first
    props.push(<PropertyInput key={'from_node_id'} propKey={'from_node_id.value'} 
            label={'From Node'} prop={template.from_node_id} value_type={'node'}
            onChange={(changeType, oldPath, newPath, prop) => this.setProperty(changeType, oldPath, newPath, prop)} />);
    props.push(<PropertyInput key={'to_node_id'} propKey={'to_node_id.value'} 
            label={'To Node'} prop={template.to_node_id} value_type={'node'}
            onChange={(changeType, oldPath, newPath, prop) => this.setProperty(changeType, oldPath, newPath, prop)} />);

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
      props.push(<PropertyBuilder key={key} index={i} prop={prop} relationshipTemplate={this.props.relationshipTemplate} 
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
    if (this.props.relationshipTemplate.template) {
      templateBuilder = 
        <form className="form-inline">
          <PropertyInput propKey={'rel_type'} label={'Relationship Type'} value={this.props.relationshipTemplate.template.rel_type}
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
      <div id="apix-relationship-builder-container">
        <div id="apix-relationship-builder">
          <LoadingOverlay show={this.props.relationshipTemplate.isFetching} />
          {templateBuilder}
        </div>
      </div>
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