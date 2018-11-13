import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Button, Glyphicon } from 'react-bootstrap';
import NodeInstancePopulator from '../NodeInstance/NodeInstancePopulator';
import NodeSearchResult from '../NodeInstance/NodeSearchResult';
import test_data from  '../../test_data.json'; // TODO --DTM-- Delete

class NodesPanel extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderNodes = this.renderNodes.bind(this);

    // Initialize state
    this.state = {
      user: {},
      editing: props.editing,
      node: props.node,
    };
  }

  renderNodes() {
    // Get nodes from test data if they exist
    let nodes = (test_data.nodes[this.props.activeTemplate.label]) ? test_data.nodes[this.props.activeTemplate.label] : [];

    // Initialize variables
    let nodeComps = [], 
        editNode = this.props.editNode,
        templateSettings = this.props.settings.repos[this.props.repo.name][this.props.activeTemplate.label];

    console.log('nodes: ', nodes);
    console.log('templateSettings: ', templateSettings);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodes ) !== '[object Array]' ) return;

    // Iterate through nodes
    nodes.forEach(function (node, index) {
      // Wrap router link and render props in NodeSearchResult
      nodeComps.push(
        <div key={node.nid} href="#" onClick={() => editNode(node)} className="node-instance-wrapper">
          <NodeSearchResult key={index} node={node} templateSettings={templateSettings} />
        </div>
      );
    });
    return nodeComps;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <div>
        <div className="panel-heading clearfix">
          <h3>Nodes</h3>
          <Button bsStyle="primary" onClick={() => this.props.addNode()}>
            <Glyphicon glyph="plus" />
          </Button>
        </div>
        <div className="panel-body">
          {this.renderNodes()}
        </div>
      </div>
    );
  }
}

export default NodesPanel;