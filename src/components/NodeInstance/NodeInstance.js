import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import './NodeInstance.css'
import { Link, Redirect } from 'react-router-dom';
import { updateNode, fetchNode, fetchDeleteNode } from '../../actions/nodes';
import { updateNodeTemplate, fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';

class NodeInstance extends Component {
  constructor(props) {
    super(props);

    // Add status constants
    this.REDIR_STATUS = {
      DONE: 'DONE',
      FETCHING_NODE: 'FETCHING_NODE',
      FETCHING_TEMPLATE: 'FETCHING_TEMPLATE'
    }

    // Check if url matches a preset route
    let defined = ['add','search'], state, display, redirStatus = this.REDIR_STATUS.DONE;

    // If searching or adding, don't display
    if (defined.indexOf(this.props.match.params.id) > -1) display = false;
    else display = true;

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template && props.match.params.label !== 'node') {
      this.getTemplate(props.match.params.label);
      state = {
        nodeTemplate: { isFetching: true },
      };
    }

    // If node doesn't exist, query it from server
    if (!props.node.instance) {
      // If route is preset, remove loader
      if (!display) {
        state = {
          node: { isFetching: false},
        };
      } else {
        this.getNode(props.match.params.label, props.match.params.id);
        state = {
          node: { isFetching: true },
        };
      }
      
    }

    // Assign combined state
    this.state = Object.assign({
      nodeTemplate: props.nodeTemplate,
      node: props.node,
      display: display,
      redirStatus: redirStatus
    }, state);
  }

  componentWillReceiveProps(nextProps) {
    // Check if url matches a preset route
    let defined = ['add','search'], display = true, redirStatus = this.REDIR_STATUS.DONE;
    if (defined.indexOf(nextProps.match.params.id) > -1) display = false;

    // If redirected without content updated, fetch new node
    if (nextProps.match.params.label === 'node' && 
        nextProps.node.instance &&
        nextProps.node.instance.nid !== nextProps.match.params.id) {
        this.getNode(nextProps.match.params.label, nextProps.match.params.id);
        redirStatus = this.REDIR_STATUS.FETCHING_NODE;
    }

    // If node received and redirecting, then redirect to correct node
    if (nextProps.node.instance && this.state.redirStatus === this.REDIR_STATUS.FETCHING_NODE) {
      this.getTemplate(nextProps.node.instance.label);
      redirStatus = this.REDIR_STATUS.FETCHING_TEMPLATE;
    }

    // Sync redux store with state
    this.setState({
      node: nextProps.node,
      display: display,
      redirStatus: redirStatus
    });


  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  updateTemplate(template) {
    // Dispatch new template to store
    this.props.dispatch(updateNodeTemplate(template));
  }

  getNode(templateLabel, nodeId) {
    // Dispatch fetchNode to get node by label and id
    this.props.dispatch(fetchNode(templateLabel, nodeId));
  }

  updateNode(node) {
    // Dispatch new node to store
    this.props.dispatch(updateNode(node));
  }

  deleteNode(node) {
    // Dispatch new node to store
    this.props.dispatch(fetchDeleteNode(node));
  }
  
  render() {
    console.log("this.state: ", this.state); // TODO --DM-- Remove
    console.log("this.props: ", this.props); // TODO --DM-- Remove

    let nodePanel = "";

    // if redirect is true, then redirect to correct node
    if (this.state.redirStatus === this.REDIR_STATUS.FETCHING_TEMPLATE) {
      // Initialize node
      let instance = this.props.node.instance;

      // Redirect to correct path
      return (<Redirect to={`/n/${instance.label}/${instance.nid}`}/>);
    }

    // Generate nodePanel if node and nodeTemplate exist
    if (this.props.node.instance && this.props.nodeTemplate.template && this.state.display) {
      // Initialize node
      let instance = this.props.node.instance;

      // Check for and assign node name
      let nodeName = instance.properties.name ? instance.properties.name : "";

      nodePanel =
        <div className="node-instance">
          <div className="panel-heading">
            <h3 className="panel-title node-name">{nodeName}</h3>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <Link key={instance['nid']+'-edit'} 
                    to={`/n/${this.props.nodeTemplate.template['label']}/${instance['nid']}/edit` }>
                      Edit {nodeName}
                </Link>
                <br />
                <a key={instance['nid']+'-delete'} onClick={() => this.deleteNode(instance)}>Delete {nodeName}</a>
                <br />
                {/* TODO --DM-- Implement delete button */}
              </div>
              {Helpers.renderProps(this.props.node)}
              {Helpers.renderRels(this.props.node.instance.relationships)}
            </div>
          </div>
        </div>
      
      console.log('Node:', instance);
    }

    return (
      
      <div className="node-instance-container">
        <LoadingOverlay show={this.state.node.isFetching} />
        {nodePanel}
      </div>
    );
  }
}

export default NodeInstance;