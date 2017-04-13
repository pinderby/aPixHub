import React, { Component } from 'react';
import Helpers from '../helpers.js';
import PropertyPopulator from './PropertyPopulator';
import './ApixNodeBuilder.css';
import { updateNode, addProp, setProp, removeProp, renameProp, initializeNodeTemplate } from '../actions'; // TODO --DM-- Remove all except updateNode()?
import BaseModel from '../constants/BaseModel.js';

class ApixNodePopulator extends Component {
  constructor(props) {
    super(props);

    // Initialize node
    let nodeTemplate = props.nodeTemplate;
    let node = props.node;

    // Bind callbacks
    this.updateNode = this.updateNode.bind(this);
    this.setProperty = this.setProperty.bind(this);

    console.log('props.node', props.node); // TODO --DM-- Remove
    console.log('props.node', props.nodeTemplate); // TODO --DM-- Remove
    this.state = {
      nodeTemplate: props.nodeTemplate,
      node: props.node,
      nodeLabel: props.nodeTemplate.label
    };
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

  getTemplate() {
    // Initialize dispatch
    var dispatch = this.props.dispatch;
    
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
          
          dispatch(initializeNodeTemplate(templates[0]));
      });
      
      // this.setState({ node: });
    }).catch(function(err) {
      // Error :(
    });
  }

  getNodes(nodeLabel) {
    // Initialize dispatch
    var dispatch = this.props.dispatch;
    
    // url (required), options (optional)
    fetch('https://apix.rocks/x/'+nodeLabel+'/', {
      method: 'GET'
    }).then(function(response) {
      response.json().then(function(result) {
          console.log('Result: ', result);
          var templates = [];
          result.forEach(function (obj) {
            templates.push(obj);
          });
          
          // dispatch(initializeNodeTemplate(templates[2]));
      });
      
      // this.setState({ node: });
    }).catch(function(err) {
      // Error :(
    });
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
      if (prop.type === 'object') {
        let object = {};
        for(var objProp in prop.properties) {
          object[objProp] = prop.properties[objProp].value;
        }
        payload.properties[prop.label] = object;
      } else {
        payload.properties[prop.label] = prop.value;
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
    const templateProps = this.props.nodeTemplate.properties;
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

    return (
      <div id="apix-node-populator-container">
        <div id="apix-node-populator">
          <form className="form-inline">
            {this.renderProperties()}
            <br /><br />
            <RequestButton text={'Get Template'} onClick={() => this.getTemplate()}/>
            <br /><br />
            <RequestButton text={'Get Nodes'} onClick={() => this.getNodes(this.props.nodeLabel)}/>
            <br /><br />
            <RequestButton text={'Submit Node'} onClick={() => this.submitNode(this.props.nodeLabel)}/>
          </form>
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

export default ApixNodePopulator;