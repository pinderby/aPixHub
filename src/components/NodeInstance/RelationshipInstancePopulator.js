import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import PropertyPopulator from './PropertyPopulator';
import PropertyInput from '../PropertyInput';
import '../TemplatesPanel/TemplateBuilder.css';
// import { updateRelationship, fetchRelationship, fetchPostRelationship, fetchPutRelationship } from '../../actions/nodes';
import { fetchRelationshipTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';

class RelationshipInstancePopulator extends Component {
  constructor(props) {
    super(props);

    // Bind callbacks
    // this.updateRelationship = this.updateRelationship.bind(this);
    // this.setProperty = this.setProperty.bind(this);

    console.log('props.relationships', props.relationships); // TODO --DM-- Remove
    console.log('props.relationshipTemplate', props.relationshipTemplate); // TODO --DM-- Remove
    
    // // Assign combined state
    // this.state = Object.assign({
    //   relationshipTemplate: props.relationshipTemplate,
    //   relationship: props.relationship,
    //   creating: creating
    // }, state);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps) {
    // // Assign relationship
    // let relationship = nextProps.relationship;

    // // If template exists and creating, add properties to relationship
    // if (nextProps.relationshipTemplate.template && this.state.creating) {
    //   // Assign props
    //   let template = nextProps.relationshipTemplate.template;
    //   let props = template.properties;

    //   // Create base relationship instance object
    //   relationship.instance = { rel_type: template.rel_type, properties: {} };

    //   // Assign properties from template to base node
    //   props.forEach((prop) => {
    //     relationship.instance.properties[prop.key] = '';
    //   }) 
    // }

    // // Sync redux store with state
    // this.setState({
    //   relationship: relationship
    // });
  }

  // TODO --DM-- Remove?
  // getTemplate(templateId) {
  //   // Dispatch fetchTemplate to get template by id
  //   this.props.dispatch(fetchRelationshipTemplate(templateId));
  // }

  // getRelationship(templateId, relationshipId) {
  //   // Dispatch fetchRelationship to get relationship by id
  //   this.props.dispatch(fetchRelationship(relationshipId));
  // }

  // updateRelationship(relationship) {
  //   // Dispatch new relationship to store
  //   this.props.dispatch(updateRelationship(relationship));
  // }

  // setProperty(path, newValue) {
  //   // Merge relationship from props (redux store) and state
  //   let relationship = Object.assign(this.props.relationship, this.state.relationship);

  //   // Update relationship with new property value
  //   relationship.instance = Helpers.setObjProp(relationship.instance, path, newValue);

  //   console.log('setProperty()  relationship: ', relationship); // TODO --DM-- Remove

  //   // Set state for updated relationship
  //   this.setState({
  //     relationship: relationship
  //   });

  //   return;
  // }
  
  // TODO --DM-- Remove?
  // submitRelationship(relTemplateId) {
  //   // Merge relationship from props (redux store) and state
  //   let instance = Object.assign(this.props.relationship.instance, this.state.relationship.instance);

  //   // Assign dispatch
  //   let dispatch = this.props.dispatch;

  //   console.log('submitRelationship(): ', instance); // TODO --DM-- Remove
    
  //   let payload = JSON.stringify(instance).replace('"[\\', '[').replace('\\"]"', '"]');
  //   console.log('Payload string: ', payload);

  //   // Initialize variables for network request
  //   if (this.state.creating) {
  //     dispatch(fetchPostRelationship(instance, payload));
  //   } else {
  //     dispatch(fetchPutRelationship(instance, payload));
  //   }
  // }

  renderRelationships(rel_type, relationships) {
    let comps = [];
    
    // If no relationships, instantiate empty array
    if (!relationships) relationships = [];

    // Iterate through relationships and render 'nid' propKey as well as properties
    relationships.forEach((rel, index) => {
      comps.push(<PropertyInput key={rel_type+index} label={'Connected To'} propKey={'nid'} prop={''} value={rel.nid}
                        onChange={(changeType, oldPath, path, value) => this.props.setProperty(`${this.props.path}.${index}.nid`, value)} />);
      comps.push(this.renderProperties(rel));
    });

    // Add an add relationship button
    comps.push(<AddRelationshipButton key={rel_type} onClick={ () => this.props.addRelationship(rel_type) } />);

    return comps;
  }

  renderProperties(rel) {
    // Initialize variables
    const templateProps = this.props.relationshipTemplate.properties;
    var props = [];
    let i = 0;

    // Iterate through template properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];

      // Initialize path if needed
      if (!prop.path) prop.path = `${this.props.path}.${this.props.index}.properties.${prop.key}`;

      // Push property input for each prop
      props.push(<PropertyPopulator key={key} index={i} prop={prop} relationship={rel} 
                        relationshipTemplate={this.props.relationshipTemplate} dispatch={this.props.dispatch} nested={false}
                        onChange={(path, value) => this.props.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // If template exists, generate template panel
    let templatePropsForm = "";
    if (this.props.relationshipTemplate) {
      // Initialize template and display label
      let template = this.props.relationshipTemplate;

      templatePropsForm =
        <div>
          <h3>{template.rel_type}</h3>
          <h4>Direction: {this.props.direction}</h4>
          {this.renderRelationships(template.rel_type, this.props.relationships)}
          {/*<br />
          <RequestButton text={'Submit Relationship'} onClick={() => this.submitRelationship(template.rel_type)}/>
          <br />
          <RequestButton text={'Update Relationship'} onClick={() => this.updateRelationship(this.state.relationship)}/>*/}
        </div>
      
      console.log('Template:', template);
    }

    return (
      <div id="apix-relationship-populator-container">
        <div id="apix-relationship-populator">
          {templatePropsForm}
        </div>
      </div>
    );
  }
}

export class AddRelationshipButton extends Component {
  render() {
    return (
      <button type="button" className="btn btn-info" onClick={() => this.props.onClick()}>
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Relationship
      </button>
    );
  }
}

export class RequestButton extends Component {
  render() {
    return (
      <button type="button" className="btn btn-info" onClick={() => this.props.onClick()}>
        {this.props.text}
      </button>
    );
  }
}

export default RelationshipInstancePopulator;