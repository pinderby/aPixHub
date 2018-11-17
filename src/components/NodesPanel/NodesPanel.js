import React, { Component } from 'react';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { Button, Glyphicon, FormControl, FormGroup, InputGroup, Form, Overlay, Popover } from 'react-bootstrap';
import Helpers from '../../helpers.js';
import NodeInstancePopulator from '../NodeInstance/NodeInstancePopulator';
import NodeSearchResult from '../NodeInstance/NodeSearchResult';

class NodesPanel extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderNodes = this.renderNodes.bind(this);
    this.filterNodes = this.filterNodes.bind(this);
    this.createNode = this.createNode.bind(this); 
    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.onQueryPropChanged = this.onQueryPropChanged.bind(this);

    // Initialize state
    this.state = {
      user: {},
      query: "",
      queryProp: "",
      editing: props.editing,
      node: props.node,
      showPopover: false
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

  // Create new node
  createNode(e) {
    // If no active template selected, show select template popover
    if (!this.props.activeTemplate || _.isEmpty(this.props.activeTemplate.label)) {
      // Set target for popover and show for 2secs
      this.setState({
        showPopover: true,
        popoverTarget: e.target
      });
      setTimeout(() => this.setState({ showPopover: false }), 2000);
    } else {
      // If active template selected, create new node
      this.props.addNode();
    }
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

    // TODO --DTM-- Implement for relationships
    // If relationships or interfaces is selected, return
    if (this.props.templateType !== 0) return;

    // Filter nodes based on user query
    nodes = this.filterNodes(nodes);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodes ) !== '[object Array]' ) return;

    // Iterate through nodes
    nodes.forEach(function (node, index) {
      // Wrap router link and render props in NodeSearchResult
      nodeComps.push(
        <div key={node.nid} href="#"  className="node-instance-wrapper">
          <NodeSearchResult 
              key={index}
              node={node}
              index={index}
              templateSettings={templateSettings}
              editNode={editNode} />
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
      <div className="nodes-panel-container">
        <div className="panel-heading clearfix">
          <h3>Nodes</h3>
          {/* <SelectTemplatePopover show={true} target={createNodeButton} /> */}
          <Button className="create-node-btn" bsStyle="primary" onClick={this.createNode}>
            <Glyphicon glyph="plus" />
          </Button>
          <Overlay show={this.state.showPopover}
            container={this}
            target={this.state.popoverTarget}
            placement="left">
            <Popover id="popover-positioned-left" className="select-template-popover">
              Please select a template on the left to add a node.
            </Popover>
          </Overlay>
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