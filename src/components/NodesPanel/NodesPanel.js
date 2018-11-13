import React, { Component } from 'react';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { Button, Glyphicon, FormControl, FormGroup, InputGroup, Form } from 'react-bootstrap';
import Helpers from '../../helpers.js';
import NodeInstancePopulator from '../NodeInstance/NodeInstancePopulator';
import NodeSearchResult from '../NodeInstance/NodeSearchResult';

class NodesPanel extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderNodes = this.renderNodes.bind(this);
    this.filterNodes = this.filterNodes.bind(this);
    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.onQueryPropChanged = this.onQueryPropChanged.bind(this);

    // Initialize state
    this.state = {
      user: {},
      query: "",
      queryProp: "",
      editing: props.editing,
      node: props.node,
    };
  }

  // Update view with new search query
  onQueryChanged(e) {
    this.setState({
      query: e.target.value
    });
  }

  // Update view with new search query prop
  onQueryPropChanged(e) {
    this.setState({
      queryProp: e.target.value
    });
  }

  // Filter nodes based on search query
  filterNodes(nodes) {
    // Initialize variables
    let queryProp = this.state.queryProp;
    
    // Return if there is no activeTemplate selected
    if (!this.props.activeTemplate.hasOwnProperty('properties')) { return; }
    else if (!queryProp) { queryProp =  this.props.activeTemplate.properties[0]['key']; }
    
    // Filter nodes based on query and queryProp
    return nodes.filter(node => {
      return String(node.properties[queryProp]).includes(this.state.query);
    });
  }

  renderNodes(nodes, templateSettings) {
    // Initialize variables
    let nodeComps = [], 
        editNode = this.props.editNode;

    console.log('nodes: ', nodes);
    console.log('templateSettings: ', templateSettings);

    // Filter nodes based on user query
    nodes = this.filterNodes(nodes);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodes ) !== '[object Array]' ) return;

    // Iterate through nodes
    nodes.forEach(function (node, index) {
      // Wrap router link and render props in NodeSearchResult
      nodeComps.push(
        <div key={node.nid} href="#" onClick={() => editNode(nodes, index)} className="node-instance-wrapper">
          <NodeSearchResult key={index} node={node} templateSettings={templateSettings} />
        </div>
      );
    });
    return nodeComps;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // Create search form if template is selected
    let nodesSearchForm = "";
    if (this.props.activeTemplate && this.props.activeTemplate.hasOwnProperty('properties')) {
      nodesSearchForm =
        <Form inline>
          <FormGroup>
            <InputGroup>
              <FormControl 
                className="searchbar" 
                type="text" 
                placeholder="Search"
                value={this.state.query}
                onChange={this.onQueryChanged} />
              <FormControl componentClass="select" placeholder="Property"
                value={this.state.queryProp}
                onChange={this.onQueryPropChanged}>
                {this.props.activeTemplate.properties.map((prop) =>
                  <option key={prop.key} value={prop.key}>{Helpers.formatPropKey(prop.key)}</option>
                )}
              </FormControl>
            </InputGroup>
          </FormGroup>
        </Form>
    }

    return (
      <div>
        <div className="panel-heading clearfix">
          <h3>Nodes</h3>
          <Button bsStyle="primary" onClick={() => this.props.addNode()}>
            <Glyphicon glyph="plus" />
          </Button>
        </div>
        <div className="nodes-searchbar">
          {nodesSearchForm}
        </div>
        <div className="panel-body">
          {this.renderNodes(this.props.nodes, this.props.templateSettings)}
        </div>
      </div>
    );
  }
}

export default NodesPanel;