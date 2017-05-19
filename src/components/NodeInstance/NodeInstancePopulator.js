import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import PropertyPopulator from './PropertyPopulator';
import '../NodeTemplate/TemplateBuilder.css';
import { updateNode, fetchNode, fetchPostNode, fetchPutNode } from '../../actions/nodes';
import { fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';

class NodeInstancePopulator extends Component {
  constructor(props) {
    super(props);

    // Get path url
    let splitUrlPath = this.props.match.url.split("/");

    // Determine if use if creating a new node or editing an existing one
    let state, node, creating = (splitUrlPath[splitUrlPath.length-1] === "add");

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template) {
      this.getTemplate(props.match.params.label);
      state = {
        nodeTemplate: { isFetching: true },
      };
    }

    // If node doesn't exist, query it from server
    if (!props.node.instance) {
      if (creating) {
        state = {
          node: { isFetching: false },
        };
      } else {
        this.getNode(props.match.params.label, props.match.params.id);
        state = {
          node: { isFetching: true },
        };
      }
    }

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.setProperty = this.setProperty.bind(this);

    console.log('props.node', props.node); // TODO --DM-- Remove
    console.log('props.node', props.nodeTemplate); // TODO --DM-- Remove
    
    // Assign combined state
    this.state = Object.assign({
      nodeTemplate: props.nodeTemplate,
      node: props.node,
      creating: creating
    }, state);
  }

  componentWillReceiveProps(nextProps) {
    // Assign node
    let node = nextProps.node;

    // If template exists and creating, add properties to node
    if (nextProps.nodeTemplate.template && this.state.creating) {
      // Assign props
      let template = nextProps.nodeTemplate.template;
      let props = template.properties;

      // Create base node instance object
      node.instance = { label: template.label, properties: {} };

      // Assign properties from template to base node
      props.forEach((prop) => {
        node.instance.properties[prop.key] = '';
      }) 
    }

    // Sync redux store with state
    this.setState({
      node: node
    });
  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  getNode(templateLabel, nodeId) {
    // Dispatch fetchNode to get node by label and id
    this.props.dispatch(fetchNode(templateLabel, nodeId));
  }

  updateNode(node) {
    // Dispatch new node to store
    this.props.dispatch(updateNode(node));
  }

  setProperty(path, newValue) {
    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    // Update node with new property value
    node.instance = Helpers.setObjProp(node.instance, path, newValue);

    console.log('setProperty()  node: ', node); // TODO --DM-- Remove

    // Set state for updated node
    this.setState({
      node: node
    });

    return;
  }
  
  submitNode(nodeLabel) {
    // Merge node from props (redux store) and state
    let instance = Object.assign(this.props.node.instance, this.state.node.instance);

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
    const templateProps = this.props.nodeTemplate.template.properties;
    var props = [];
    let i = 0;

    // Iterate through template properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];

      // Initialize path if needed
      if (!prop.path) prop.path = 'properties.'+prop.key;

      // Push property input for each prop
      props.push(<PropertyPopulator key={key} index={i} prop={prop} node={this.state.node} 
                        nodeTemplate={this.props.nodeTemplate} dispatch={this.props.dispatch} nested={false}
                        onChange={(path, value) => this.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
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
    if (this.props.nodeTemplate.template) {
      // Initialize template and display label
      let template = this.props.nodeTemplate.template;

      templatePropsForm =
        <form className="form-inline">
          <h3>{template.label}</h3>
          {this.renderProperties()}
          <br />
          <RequestButton text={'Submit Node'} onClick={() => this.submitNode(template.label)}/>
        </form>
      
      console.log('Template:', template);
    }

    return (
      <div id="apix-node-populator-container">
        <div id="apix-node-populator">
          <LoadingOverlay show={this.state.node.isFetching} />
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