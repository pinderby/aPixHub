import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import PropertyPopulator from './PropertyPopulator';
import '../NodeTemplate/TemplateBuilder.css';
import { updateNode } from '../../actions/nodes';
import { fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';

class NodeInstancePopulator extends Component {
  constructor(props) {
    super(props);

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template) {
      this.getTemplate(props.match.params.id);
      this.state = {
        nodeTemplate: { isFetching: true },
      };
      return;
    }

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.setProperty = this.setProperty.bind(this);

    console.log('props.node', props.node); // TODO --DM-- Remove
    console.log('props.node', props.nodeTemplate); // TODO --DM-- Remove
    this.state = {
      nodeTemplate: props.nodeTemplate,
      node: props.node,
      nodeLabel: props.nodeTemplate.template.label
    };
  }

  getTemplate(templateId) {
    // Dispatch fetchTemplate to get template by id
    this.props.dispatch(fetchTemplate(templateId));
  }

  updateNode(node) {
    // Dispatch new node to store
    this.props.dispatch(updateNode(node));
  }

  setProperty(path, newValue) {
    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    // Update node with new property value
    node = Helpers.setObjProp(node, path, newValue);

    // Set state for updated node
    this.setState({
      node: node
    });

    return;
  }
  
  submitNode(nodeLabel) {
    // Merge node from props (redux store) and state
    let node = Object.assign(this.props.node, this.state.node);

    let payload = {};
    payload.properties = {};

    console.log('submitNode(): ', nodeLabel, node); // TODO --DM-- Remove

    for(var propLabel in node.properties) {
      let prop = node.properties[propLabel];
      console.log('submitNode() prop: ', prop); // TODO --DM-- Remove
      if (prop.value_type === 'object') {
        let object = {};
        for(var objProp in prop.properties) {
          object[objProp] = prop.properties[objProp].value;
        }
        payload.properties[prop.key] = object;
      } else {
        payload.properties[prop.key] = prop.value;
      }
      
    }

    console.log('Payload: ', payload);
    
    payload = JSON.stringify(payload).replace('"[\\', '[').replace('\\"]"', '"]');
    console.log('Payload string: ', payload);

    // var data = new FormData();
    // data.append( "json", JSON.stringify( payload ) );

    // console.log('Payload: ', data);

    fetch("https://apix.rocks/x/"+nodeLabel, {
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        method: "POST",
        body: payload
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ console.log('Data: ', JSON.stringify( data ) ); });
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
      if (!prop.path) prop.path = 'properties.'+key;

      // Push property input for each prop
      props.push(<PropertyPopulator key={key} index={i} prop={prop} node={this.props.node} 
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
          <LoadingOverlay show={this.props.nodeTemplate.isFetching} />
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