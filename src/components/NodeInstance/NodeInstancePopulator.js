import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import _ from 'lodash';
import PropertyPopulator from './PropertyPopulator';
import RelationshipInstancePopulator from './RelationshipInstancePopulator';
import '../NodeTemplate/TemplateBuilder.css';
import { Button } from 'react-bootstrap';
import { updateNode, fetchNode, fetchPostNode, fetchPutNode } from '../../actions/nodes';
import { DIRECTION } from '../../constants/PropertyTypes';
import { fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';

class NodeInstancePopulator extends Component {
  constructor(props) {
    super(props);

    
    // // Get path url
    // let splitUrlPath = this.props.match.url.split("/");

    // // Determine if use if creating a new node or editing an existing one
    // let state, node, relationshipTemplates, creating = (splitUrlPath[splitUrlPath.length-1] === "add");

    // // If nodeTemplate doesn't exist, query it from server
    // if (!props.nodeTemplate.template) {
    //   this.getTemplate(props.match.params.label);
    //   state = {
    //     nodeTemplate: { isFetching: true },
    //   };
    // }

    // // If creating new node, instantiate blank node
    // if (creating) {
    //   state = {
    //     node: {  
    //       isFetching: false, 
    //       instance: { label: props.match.params.label, 
    //                   properties: {},
    //                   relationships: { in: [], out: [] } } 
    //     },
    //   };
    // }

    // // If node doesn't exist and editing, query it from server
    // if (!props.node.instance && !creating) {
    //   this.getNode(props.match.params.label, props.match.params.id);
    //   state = {
    //     node: { isFetching: true },
    //   };
    // }

    // // Pluck relationshipTemplates and organize into single object
    // if (props.nodeTemplate.template) {
    //   relationshipTemplates = this.assignRelationshipTemplates(props.nodeTemplate.template);
    // }

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.setProperty = this.setProperty.bind(this);

    console.log('props.template', props.template); // TODO --DM-- Remove
    console.log('props.node', props.node); // TODO --DM-- Remove
    
    // Assign combined state
    // this.state = Object.assign({
    //   nodeTemplate: props.template,
    //   // relationshipTemplates: relationshipTemplates,
    //   node: props.node,
    //   editing: props.editing
    // }, state);

    this.state = {
      nodeTemplate: props.template,
      node: props.node,
      editing: props.editing
    }
  }

  // Update state if props have changed
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.node, this.props.node)) this.setState({ node: this.props.node });
  }

  // componentWillReceiveProps(nextProps) {
  //   // Assign node
  //   let relationshipTemplates, node = nextProps.node;

  //   // If template exists, assign relationshipTemplates
  //   if (nextProps.nodeTemplate.template) {
  //     relationshipTemplates = this.assignRelationshipTemplates(nextProps.nodeTemplate.template);
  //   }

  //   // If template exists and creating, add properties to node
  //   if (nextProps.nodeTemplate.template && this.state.creating) {
  //     // Assign props
  //     let template = nextProps.nodeTemplate.template;
  //     let props = template.properties;

  //     // Create base node instance object
  //     node.instance = { label: template.label, 
  //                       properties: {},
  //                       relationships: { in: [], out: [] } };

  //     // Assign properties from template to base node
  //     props.forEach((prop) => {
  //       node.instance.properties[prop.key] = '';
  //     }) 
  //   }

  //   // Add relationships property if missing
  //   if (node.instance && !node.instance.relationships) {
  //     node.instance.relationships = { in: [], out: [] };
  //   }

  //   // Sync redux store with state
  //   this.setState({
  //     relationshipTemplates: relationshipTemplates,
  //     node: node
  //   });
  // }

  // assignRelationshipTemplates(nodeTemplate) {
  //   // Instantiate base templates object
  //   let relationshipTemplates = { in: {}, out: {} };

  //   // Iterate through and assign in relationships
  //   nodeTemplate.in_relationships.forEach((rel) => {
  //     relationshipTemplates.in[rel.rel_type] = rel;
  //   });

  //   // Iterate through and assign out relationships
  //   nodeTemplate.in_relationships.forEach((rel) => {
  //     relationshipTemplates.out[rel.rel_type] = rel;
  //   });

  //   return relationshipTemplates;
  // }

  // getTemplate(templateLabel) {
  //   // Dispatch fetchTemplate to get template by label
  //   this.props.dispatch(fetchTemplate(templateLabel));
  // }

  // getNode(templateLabel, nodeId) {
  //   // Dispatch fetchNode to get node by label and id
  //   this.props.dispatch(fetchNode(templateLabel, nodeId));
  // }

  updateNode(node) {
    // Dispatch new node to store
    // this.props.dispatch(updateNode(node)); // TODO --DTM-- Remove
  }

  setProperty(path, newValue) {
    console.log('setProperty() path, newValue: ', path, newValue); // TODO --DM-- Remove

    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    // Update node with new property value
    node = Helpers.setObjProp(node, path, newValue);

    console.log('setProperty()  node: ', node); // TODO --DM-- Remove

    // Set state for updated node
    this.setState({
      node: node
    });

    return;
  }

  addRelationship(direction, rel_type) {
    // Merge node from props (redux store) and state
    let properties = {}, node = Object.assign(this.props.node, this.state.node);

    // Assign properties from template to base relationship
    let props = this.state.relationshipTemplates[direction][rel_type]['properties'];
    props.forEach((prop) => {
      properties[prop.key] = '';
    })

    // Add relationships property if absent
    if (!node.instance.relationships) node.instance.relationships = { in: [], out: [] };

    // Create new base relationship
    node.instance.relationships[direction].push({
      rel_type: rel_type,
      nid: '',
      properties: properties
    });
    
    // Set state for updated node
    this.setState({
      node: node
    });
  }
  
  submitNode(nodeLabel) {
    // Merge node from props (redux store) and state
    let instance = Object.assign(this.props.node.instance, this.state.node.instance);

    // Remove relationships if empty
    if (!instance.relationships || 
        (!instance.relationships.in.length && !instance.relationships.out.length)) {
      delete instance.relationships;
    }

    // Assign dispatch
    let dispatch = this.props.dispatch;

    console.log('submitNode(): ', instance); // TODO --DM-- Remove
    
    let payload = JSON.stringify(instance).replace('"[\\', '[').replace('\\"]"', '"]');
    console.log('Payload string: ', payload);

    // Initialize variables for network request
    let url, method;
    if (this.state.creating) {
      dispatch(fetchPostNode(instance, payload));
    } else {
      dispatch(fetchPutNode(instance, payload));
    }
  }

  renderProperties() {
    // Initialize variables
    const templateProps = this.props.template.properties;
    var props = [];
    let i = 0;

    console.log("templateProps: ", templateProps);

    // Iterate through template properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];

      // Initialize path if needed
      if (!prop.path) prop.path = 'properties.'+prop.key;

      // Push property input for each prop
      props.push(<PropertyPopulator key={key} index={i} prop={prop} node={this.props.node} 
                        nodeTemplate={this.props.template} dispatch={this.props.dispatch} nested={false}
                        onChange={(path, value) => this.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }

  renderRelationships() {
    // Initialize variables
    const inRels = this.props.template.in_relationships;
    const outRels = this.props.template.out_relationships;
    const node = this.props.node;
    var relComps = [];
    let i = 0;

    // TODO --DM-- Sort relationships into temp object
    let rels = { in: {}, out: {} };

    // Iterate through relationships and assign rel_type to temp object
    if (inRels.length >= 1 && Object.prototype.toString.call( inRels ) === '[object Array]' ) {
      inRels.forEach( (rel) => {
        rels.in[rel.rel_type] = [];
      });
    }
    if (outRels.length >= 1 && Object.prototype.toString.call( outRels ) === '[object Array]' ) {
      outRels.forEach( (rel) => {
        rels.out[rel.rel_type] = [];
      });
    }

    // Assign node relationships to temp object if available
    if (node.instance && node.instance.relationships) {
      const nodeRels = node.instance.relationships;
      // Add relationships to temp object
      nodeRels.in.forEach((rel) => {
        // If doesn't exists, add rel_type array
        if (!rels.in[rel.rel_type]) rels.in[rel.rel_type] = [];

        // Assign to appropriate array
        rels.in[rel.rel_type].push(rel);
      });
      nodeRels.out.forEach((rel) => {
        // If doesn't exists, add rel_type array
        if (!rels.out[rel.rel_type]) rels.out[rel.rel_type] = [];

        // Assign to appropriate array
        rels.out[rel.rel_type].push(rel);
      });
    }

    // Iterate through relationships
    inRels.forEach( (rel) => {
      console.log('rel: ', rel);

      // Push property input for each prop
      relComps.push(<RelationshipInstancePopulator key={rel.id} index={i} relationships={rels.in[rel.rel_type]} relationshipTemplate={rel} 
                        relationship={rel} nodeTemplate={this.props.nodeTemplate} dispatch={this.props.dispatch} 
                        direction={DIRECTION.IN} path={'relationships.in'}
                        setProperty={(path, value) => this.setProperty(path, value)}
                        addRelationship={(rel_type) => this.addRelationship(DIRECTION.IN, rel_type) } />); // TODO --DM-- manage keys for iteration
      relComps.push(<br key={rel.id.toString()+'1000'} />)

      // Increment index
      i++;
    });
    outRels.forEach( (rel) => {
      console.log('rel: ', rel);

      // Push property input for each prop
      relComps.push(<RelationshipInstancePopulator key={rel.id} index={i} relationships={rels.in[rel.rel_type]} relationshipTemplate={rel} 
                        relationship={rel} nodeTemplate={this.props.nodeTemplate} dispatch={this.props.dispatch} 
                        direction={DIRECTION.OUT} path={'relationships.out'}
                        setProperty={(path, value) => this.setProperty(path, value)}
                        addRelationship={(rel_type) => this.addRelationship(DIRECTION.OUT, rel_type) } />); // TODO --DM-- manage keys for iteration
      relComps.push(<br key={rel.id.toString()+'1000'} />)

      // Increment index
      i++;
    });

    return relComps;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // If template exists, generate template panel
    let templatePropsForm = "";
    if (this.props.template) {
      // Initialize template and display label
      let template = this.props.template;

      templatePropsForm =
        <form>
          <h3>{template.label}</h3>
          {this.renderProperties()}
          {/* TODO --DTM-- Handle relationships */}
          {/* {this.renderRelationships()} */}
          <br />
          {/* <RequestButton text={'Submit Node'} onClick={() => this.submitNode(template.label)}/> */}
          <RequestButton text={'Save Node'} 
              onClick={() => this.props.saveNode(this.props.template.label, this.state.node, this.props.index)}/>
          <Button className="template-remove-node-btn" bsStyle="danger"
                  onClick={() => this.props.deleteNode(this.props.template.label, this.props.index)}>
                  Delete Node
          </Button>
        </form>
      
      console.log('Template:', template);
    }

    return (
      <div id="apix-node-populator-container">
        <div className="apix-node-populator">
          {/* <LoadingOverlay show={this.state.node.isFetching} /> */}
          {templatePropsForm}
        </div>
      </div>
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

export default NodeInstancePopulator;