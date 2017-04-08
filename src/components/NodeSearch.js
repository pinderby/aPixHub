import React, { Component } from 'react';
import './NodeSearch.css';
import NodeSearchResult from './NodeSearchResult.js';
import logan from '../logan.json';

class NodeSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
    };
  }

  searchNodes(query) {
    // url (required), options (optional)
    fetch('https://apix.rocks/x/movie/search', {
      method: 'post',
      body: JSON.stringify({
		    properties: {title: query}
      })
    }).then(function(response) {
      console.log('Response', response.json());
      // response.json().then(function(result) {
      //     // here you can use the result of promiseB
      //     console.log('Response', result);
      // });
    }).catch(function(err) {
      // Error :(
    });
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
    for (var i = 0; i < 10; i++) { 
      this.state.nodes.push(logan);
    }
  
    return (
      <div id="node-search-container">
        <SearchNavbar searchNodes={(q) => this.searchNodes(q)} />
        <div className="search-results-container container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <SearchContentBody nodes={this.state.nodes} />
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
                <form className="navbar-form topbar-form navbar-left" onSubmit={() => this.props.searchNodes(this.state.value)}>
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