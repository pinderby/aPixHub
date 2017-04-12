import React, { Component } from 'react';
import Helpers from '../helpers.js';
import logan from '../logan.json';
import PropertyBuilder from './PropertyBuilder';
import './ApixNodeBuilder.css';
import { updateNode, addProp, setProp, removeProp, renameProp, initializeNodeTemplate, updateNodeTemplate } from '../actions'; // TODO --DM-- Remove all except updateNode()?
import BaseModel from '../constants/BaseModel.js';
import test_template from '../test_server_node.json';

class ApixNodeBuilder extends Component {
  constructor(props) {
    super(props);

    // Initialize template
    let nodeTemplate = props.nodeTemplate;
    
    // Check if node is already initialized
    if (!nodeTemplate || !props.nodeTemplate.hasOwnProperty('label')) { // TODO --DM-- Change how this is checked
      
      // Create new template with label
      nodeTemplate = { label:'', properties: {}} // TODO --DM-- Add label, base model props
    }
      
    // Get template properties
    let properties = nodeTemplate.properties;
    
    // Add mandatory name property
    if (!properties.name) {
      properties.name = { label:"name", display_label:"Name", type:"string", 
                          placeholder:"Name", disabled: true,path:'properties.name' };
    }
    
    // Add mandatory profile_image property
    if (!properties.profile_image) {
      properties.profile_image = { label:"profile_image", display_label:"Profile Picture", 
                                  type:"string", placeholder:"Link to Profile Picture", 
                                  disabled: true,path:'properties.profile_image' };
    }
    
    // Add mandatory cover_image property
    if (!properties.cover_image) {
      properties.cover_image = { label:"cover_image", display_label:"Cover Image", 
                                type:"string", placeholder:"Link to Cover Image", 
                                disabled: true, path:'properties.cover_image' };
    }

    // Dispatch new node to store
    props.dispatch(updateNodeTemplate(nodeTemplate));

    // Bind callbacks
    this.updateNodeTemplate = this.updateNodeTemplate.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);

    console.log('props.nodeTemplate', props.nodeTemplate); // TODO --DM-- Remove
    this.state = {
      nodeTemplate: props.nodeTemplate,
      newPropIndex: 0,
      rerender: true,
    };
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
    var prop = Helpers.getNewProp(i);

    // Update node with new property
    nodeTemplate = Helpers.setObjProp(nodeTemplate, prop.path, prop);

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
    let nodeTemplate = Object.assign(this.props.nodeTemplate, this.state.nodeTemplate);
    
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
    // Merge node from props (redux store) and state
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

  submitTemplate() {
    // Merge node from props (redux store) and state
    let nodeTemplate = Object.assign(this.props.nodeTemplate, this.state.nodeTemplate);

    let payload;
    payload.label = nodeTemplate.label;
    payload.properties = {};
    for(var prop in nodeTemplate.properties) {
      if (prop.type === 'object') {
        let object = {};
        for(var objProp in prop.properties) {
          object.properties[objProp.label] = objProp.type;
        }
        payload.properties[prop.label] = JSON.stringify(object);
      } else {
        payload.properties[prop.label] = prop.type;
      }
      
    }

    // Dispatch updated node to store
    // this.props.dispatch(submitNodeTemplate(node));
    // var payload = test_template;

    // var template = {
    //     label: "test_movie", 
    //     properties: {
    //         cover_image:"string",
    //         director:"string",
    //         name:"string",
    //         profile_image:"string",
    //         year:"integer",
    //         section: {title:"string",characters:["string"]}
    //     }
    // };
    // var payload = JSON.stringify( template );

    console.log('Payload: ', payload);

    // var data = new FormData();
    // data.append( "json", JSON.stringify( payload ) );

    // console.log('Payload: ', data);

    // fetch("https://apix.rocks/nodes",
    // {
    //     headers: new Headers({
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     }),
    //     method: "POST",
    //     body: payload
    // })
    // .then(function(res){ return res.json(); })
    // .then(function(data){ console.log('Data: ', JSON.stringify( data ) ); });
  }

  getTemplate() {
    var x = this;
    // url (required), options (optional)
    fetch('https://apix.rocks/nodes', {
      method: 'GET'
    }).then(function(response) {
      response.json().then(function(result) {
          console.log('Result: ', result);
          var templates = [];
          result.forEach(function (obj) {
            templates.push(obj);
          });
          // x.setState({ templates: templates });
          x.props.dispatch(initializeNodeTemplate(templates[2]));
      });
      
      // this.setState({ node: });
    }).catch(function(err) {
      // Error :(
    });
  }

  renderProperties() {
    // Initialize variables
    const templateProps = this.props.nodeTemplate.properties;
    var props = [];
    let i = 0;

    // Iterate through node properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];

      // Initialize path if needed
      if (!prop.path) prop.path = 'properties.'+key;

      // Initialize 'disabled' property if property is mandatory
      if (BaseModel.mandatory_fields.indexOf(prop.label) !== -1) prop.disabled = true; 
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
    console.log('this.state.nodeTemplate', this.state.nodeTemplate); // TODO --DM-- Remove
    console.log('this.props.nodeTemplate', this.props.nodeTemplate); // TODO --DM-- Remove

    return (
      <div id="apix-node-builder-container">
        <div id="apix-node-builder">
          <form className="form-inline">
            <label htmlFor={'label'}>Label</label>
            <LabelInput value={this.props.nodeTemplate.label}
              onChange={(changeType, oldPath, newPath, prop) => this.setProperty(changeType, oldPath, newPath, prop)} />
            <br /><br />
            {this.renderProperties()}
            <AddPropertyButton disabled={this.state.addProperty} onClick={() => this.addProperty()}/>
            <br /><br />
            <GetTemplateButton onClick={() => this.getTemplate()}/>
            <br /><br />
            <SubmitTemplateButton onClick={() => this.submitTemplate()}/>
          </form>
        </div>
      </div>
    );
  }
}

class LabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'label',
      value: props.value,
    };
  }

  textChanged(e, onChange) {
    // Call callback
    onChange(null, null, 'label', e.target.value);
  }
  
  render() {
    return (
      <input className="form-control" 
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

export default ApixNodeBuilder;