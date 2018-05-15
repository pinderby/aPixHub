import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import './TemplateSearch.css';
import { Link } from 'react-router-dom';
import { initializeNodeTemplate, fetchTemplates } from '../../actions/templates';
import { updateNodes } from '../../actions/nodes';
import LoadingOverlay from '../LoadingOverlay';

class TemplateSearch extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderTemplates = this.renderTemplates.bind(this);
    this.setNodeTemplate = this.setNodeTemplate.bind(this);

    this.state = {
      templates: [],
      query: "",
    };
  }

  
  componentDidMount() {
    // Send call to get all templates
    this.props.dispatch(fetchTemplates());
  }

  updateQuery(query) {
    // Update query to user input
    this.setState({
      query: query
    });
  }

  searchTemplates(e, query) {
    // Prevent default behavior
    e.preventDefault();
  }

  setNodeTemplate(template) {
    // Dispatch chosen template to store
    this.props.dispatch(initializeNodeTemplate(template));

    // Clear cached nodes
    this.props.dispatch(updateNodes([]));
  }

  renderTemplates() {
    // Initialize variables
    var templates = [], filteredTemplates = [], nodeTemplates = [], 
    setNodeTemplate = this.setNodeTemplate, query = this.state.query;
    
    // Initialize nodeTemplates if populated from server
    if (this.props.nodeTemplates.templates) nodeTemplates = this.props.nodeTemplates.templates;

    // Filter templates based on user query
    filteredTemplates = nodeTemplates.filter(function (template) {
      // If there is a query, filter templates by query (testing on label)
      if (query) return (new RegExp(query, 'i')).test(template.label);
      // Otherwise, return entire array
      else return true;
    });

    // Iterate through and render templates
    filteredTemplates.forEach(function (template, index) {
      console.log('template', template); // TODO --DM-- Remove
      templates.push(
        <div className="apix-template-container" key={template['id']+'1'}>
          <div className="apix-template" key={template['id']+'2'}>
            <div className="panel-heading" key={template['id']+'3'}>
              <Link key={template['id']+'4'} to={"/t/"+template['label'] } 
                    onClick={() => setNodeTemplate(template)}>
                <h3 className="panel-title template-label" key={template['id']+'5'}>{template.label}</h3>
              </Link>
            </div>
            <div className="panel panel-default" key={template['id']+'6'}>
              <div className="panel-body" key={template['id']+'7'}>
                {Helpers.renderTemplate(template)}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return templates;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <div>
        <TemplateNavbar searchTemplates={(e, q) => this.searchTemplates(e, q)}
                        onChange={(e) => this.updateQuery(e)} />
        <LoadingOverlay show={this.props.nodeTemplates.isFetching} />
        {this.renderTemplates()}
      </div>
    );
  }
}


class TemplateNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    // Update state with new value
    this.setState({value: event.target.value});

    // Pass value to parent callback to update parent state
    this.props.onChange(event.target.value);
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
                <a className="navbar-brand" href="#">NodeTemplates</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <form className="navbar-form topbar-form navbar-left" onSubmit={(e) => this.props.searchTemplates(e, this.state.value)}>
                  <div className="form-group">
                    <input type="text" className="search-bar form-control" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
                  </div>
                  <button type="submit" className="btn btn-default">Search</button>
                  <Link to={"/templates/add"}>
                    <button type="submit" className="btn btn-default add-template-btn">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>{" "}New Template
                    </button>
                  </Link>
                  <Link to={"/relationships/add"}>
                    <button type="submit" className="btn btn-default add-relationship-btn">
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>{" "}New Relationship
                    </button>
                  </Link>
                  <button className="btn btn-default" onClick={this.login} >{" "}Login</button>
                </form>
              </div>
            </div>
          </nav>
        </div> {/*row*/}
      </div>
    );
  }
}

export default TemplateSearch;