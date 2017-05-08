import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import './NodeInstance.css'
import { Link } from 'react-router-dom';
import { updateNode, fetchNode } from '../../actions/nodes';
import { fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';
// import NodeName from './NodeName.js';
// import InfoBox from './InfoBox.js';
// import MediaSection from './MediaSection.js';
// import ReviewsSection from './ReviewsSection.js';
// import TagsSection from './TagsSection.js';
// import logan from '../logan.json';

class NodeInstance extends Component {
  constructor(props) {
    super(props);

    // Check if url matches a preset route
    let defined = ['add','search'], state, display;

    // If searching or adding, don't display
    if (defined.indexOf(this.props.match.params.id) > -1) display = false;
    else display = true;

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template) {
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
      display: display
    }, state);
  }

  componentWillReceiveProps(nextProps) {
    // Check if url matches a preset route
    let defined = ['add','search'], display;
    if (defined.indexOf(nextProps.match.params.id) > -1) display = false;
    else display = true;

    // Sync redux store with state
    this.setState({
      node: nextProps.node,
      display: display
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

  
  // componentDidMount() {
  //   var x = this;
  //   // url (required), options (optional)
  //   fetch('https://apix.rocks/nodes', {
  //     method: 'GET'
  //   }).then(function(response) {
  //     response.json().then(function(result) {
  //         // here you can use the result of promiseB
  //         console.log('Response', result);
  //         var templates = [];
  //         result.forEach(function (obj) {
  //           templates.push(obj);
  //         });
  //         x.setState({ templates: templates });
  //     });
      
  //     // this.setState({ node: });
  //   }).catch(function(err) {
  //     // Error :(
  //   });
  // }

  /*renderNodes() {
    var nodes = [];
    this.state.nodes.forEach(function (node) {
      nodes.push(
        <div id="apix-node-container">
          <div id="apix-node">
            {Helpers.renderTemplate(node.properties)}
            <NodeName name={node.name} />
            <InfoBox node={node} />
            <MediaSection node={node} />
            <ReviewsSection reviews={node.user_reviews} />
            {Helpers.renderSections(node.sections)}
          </div>
        </div>
      );
    });
    return nodes;
  }*/
  
  render() {
    // this.state.nodes.push(logan);
    console.log("this.state: ", this.state); // TODO --DM-- Remove
    console.log("this.props: ", this.props); // TODO --DM-- Remove

    let nodePanel = "";

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
                {/* TODO --DM-- Implement delete button */}
              </div>
              {Helpers.renderProps(this.props.node)}
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