import React, { Component } from 'react';
import './NodeSearch.css';
import NodeSearchResult from './NodeSearchResult.js';
// import logan from '../logan.json';
import { initializeNodeTemplate, updateNodes } from '../actions';

class NodeSearch extends Component {
  constructor(props) {
    super(props);

    this.getTemplate();

    this.state = {
      nodes: [],
    };
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

  searchNodes(e, query) {
    // Prevent default behavior
    e.preventDefault();

    // Initialize dispatch
    var dispatch = this.props.dispatch;

    if (query) {
      // Get search results
      fetch('https://apix.rocks/x/'+this.props.nodeLabel+'/search', {
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        method: 'POST',
        body: JSON.stringify({
          properties: {title: query}
        })
    })
      .then(function(res){ return res.json(); })
      .then(function(data){ 
        console.log('Data: ', data ); 
        dispatch(updateNodes(data));
      });
    } else {
      // Get search results
      fetch('https://apix.rocks/x/'+this.props.nodeLabel, {
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        method: 'GET'
      })
      .then(function(res){ return res.json(); })
      .then(function(data){ 
        console.log('Data: ', data ); 
        dispatch(updateNodes(data));
      });
    }
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
    // for (var i = 0; i < 10; i++) { 
    //   this.state.nodes.push(logan);
    // }
    console.log("this.state: ", this.state); // TODO --DM-- Remove
    console.log("this.props: ", this.props); // TODO --DM-- Remove
  
    return (
      <div id="node-search-container">
        <SearchNavbar searchNodes={(e, q) => this.searchNodes(e, q)} />
        <div className="search-results-container container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <SearchContentBody nodes={this.props.nodes} />
            </div>
            <div className="col-md-2">
              <SearchSidebar />
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
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
                <a className="navbar-brand" href="#">MovieDb</a>
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
    var nodes = [];
    this.props.nodes.forEach(function (node, index) {
      nodes.push(
        <NodeSearchResult key={index} node={node} />
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