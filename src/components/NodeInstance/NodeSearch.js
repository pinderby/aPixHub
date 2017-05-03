import React, { Component } from 'react';
import './NodeSearch.css';
import NodeSearchResult from './NodeSearchResult.js';
import Helpers from '../../helpers.js';
import { Link } from 'react-router-dom';
import { updateNodes, updateNode, fetchAllNodes, searchNodes } from '../../actions/nodes';
import { fetchTemplate } from '../../actions/templates';
import LoadingOverlay from '../LoadingOverlay';

class NodeSearch extends Component {
  constructor(props) {
    super(props);

    // If nodeTemplate doesn't exist, query it from server
    if (!props.nodeTemplate.template) {
      this.getTemplate(props.match.params.label);
      this.state = {
        nodeTemplate: { isFetching: true },
      };
      return;
    }
  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  componentWillReceiveProps(nextProps) {
    // Sync redux store with state
    this.setState({
      nodes: nextProps.nodes
    });
  }

  searchNodes(e, query) {
    // Prevent default behavior
    e.preventDefault();

    // Initialize dispatch
    let dispatch = this.props.dispatch, nodeLabel = this.props.nodeTemplate.template.label;

    // If query, search name
    if (query) {
      // Initially filter current nodes until full results are received from server
      let nodes = this.state.nodes;
      nodes.instances = nodes.instances.filter(function(n) {
        return (new RegExp(query, 'i')).test(n.properties.title);
      } ); // TODO --DM-- filter based on property input

      // Update state with filtered nodes
      this.setState({
        nodes: nodes
      });

      // Send request to get search results
      dispatch(searchNodes(nodeLabel, 'title', query));

    // If no query, get all nodes
    } else {
      // Send request to get all nodes
      dispatch(fetchAllNodes(nodeLabel));
    }
  }

  updateNode(node) {
    // Dispatch chosen node to store
    this.props.dispatch(updateNode(node));
  }


  /*renderNodes() {
    var nodes = [];
    this.state.nodes.forEach(function (node) {
      nodes.push(
        <div id="node-container">
          <div id="node">
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
    console.log("this.state: ", this.state); // TODO --DM-- Remove
    console.log("this.props: ", this.props); // TODO --DM-- Remove

    // Check for and initialize nodeTemplate
    let searchView = "";
    if (this.props.nodeTemplate.template) {
      // Initialize template and display label
      let template = this.props.nodeTemplate.template, 
      displayLabel = Helpers.capitalizeFirstLetter(template['label']);

      searchView = 
        <div id="node-search-view-container">
          <SearchNavbar nodeLabel={this.props.nodeTemplate.template.label} 
              searchNodes={(e, q) => this.searchNodes(e, q)} />
          <div className="search-results-container container-fluid">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-8">
                <SearchContentBody nodes={this.props.nodes} label={this.props.nodeTemplate.template.label}
                    updateNode={(node) => this.updateNode(node)} />
              </div>
              <div className="col-md-2">
                <SearchSidebar />
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div>;
    }
  
    return (
      <div id="node-search-container">
        <LoadingOverlay show={this.props.nodeTemplate.isFetching} />
        {searchView}
      </div>
    );
  }
}

class SearchNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // handleSubmit(event) {
  //   console.log(this.state.value);
  //   this.props.searchNodes(this.state.value);
  //   event.preventDefault();
  // }
  
  render() {
    return (
      <div id="search-navbar">
        <div className="row">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">{Helpers.formatPropKey(this.props.nodeLabel, false)+'Db'}</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <form className="navbar-form topbar-form navbar-left" onSubmit={(e) => this.props.searchNodes(e, this.state.value)}>
                  <div className="form-group">
                    <input type="text" className="search-bar form-control" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
                  </div>
                  <select className="form-control nav-select">
                    <option>All</option>
                    <option>Actors</option>
                    <option>Characters</option>
                    <option>Keywords</option>
                    <option>Companies</option>
                  </select>
                  <button type="submit" className="btn btn-default">Search</button>
                </form>
              </div>
            </div>
          </nav>
        </div> {/*row*/}
      </div>
    );
  }
}

class SearchContentBody extends Component {
  renderSearchResults() {
    // Initialize variables
    let nodes = [], label = this.props.label, updateNode = this.props.updateNode;

    console.log('node.instances: ', this.props.nodes.instances);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( this.props.nodes.instances ) !== '[object Array]' ) return;

    // Iterate through nodes
    this.props.nodes.instances.forEach(function (node, index) {
      // Wrap router link and render props in NodeSearchResult
      nodes.push(
        <Link key={node.nid} to={"/n/"+label+"/"+node.nid} 
                    onClick={() => updateNode(node)}>
          <NodeSearchResult key={index} node={node} />
        </Link>
      );
    });
    return nodes;
  }
  
  render() {
    return (
      <div id="search-content-body">
        {this.renderSearchResults()}
      </div>
    );
  }
}

class SearchSidebar extends Component {
  render() {
    return (
      <div id="search-sidebar">
      </div>
    );
  }
}



export default NodeSearch;