import React, { Component } from 'react';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Button, Glyphicon, FormControl } from 'react-bootstrap';
import NodeSearchResult from '../NodeInstance/NodeSearchResult';
import PropertyPopulator from '../NodeInstance/PropertyPopulator';
import Sidemenu from './Sidemenu';
import NodeTemplate from '../NodeTemplate/NodeTemplate';
import Helpers from '../../helpers.js';
import { fetchAuthUser, fetchPostUser, fetchMe } from '../../actions/users';
import { changeTemplate } from '../../actions/templates';
import { updateRepoSettings } from '../../actions/settings';
import './Repo.css';

class Repo extends Component {
  constructor(props) {
    super(props);

    console.log('user_token: ', localStorage.getItem('user_token')); // TODO --DM-- Remove

    // Check if user token is already stored
    let token = '';
    if (localStorage.getItem('user_token') && 
        localStorage.getItem('user_token') !== 'undefined') {
      // If token exists, assign it to state
      token = localStorage.getItem('user_token');

      // If token exists but user does not, get "me"
      if (_.isEmpty(props.user)) props.dispatch(fetchMe()); 
    } 

    // Bind methods
    this.renderTemplates = this.renderTemplates.bind(this);
    this.renderNodes = this.renderNodes.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.addTemplate = this.addTemplate.bind(this);
    this.editTemplate = this.editTemplate.bind(this);
    this.addNode = this.addNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.logout = this.logout.bind(this);

    // Validate and update user settings with repos property
    var settings = Object.assign(props.settings, {});
    
    // Add 'repos' key if it doesn't exist
    if (!settings.hasOwnProperty('repos')) settings = Object.assign(props.settings, { repos: {} });
    
    // Add key for repo name if it doesn't exist
    if (!settings.repos.hasOwnProperty(props.repo.name)) settings.repos[props.repo.name] = {};

    // Add each template to repo settings if they don't already exist
    props.nodeTemplates.forEach(function(template, index) {
      if (!settings.repos[props.repo.name].hasOwnProperty(template.label)) settings.repos[props.repo.name][template.label] = {};
    });

    console.log('settings: ', settings); // TODO --DM-- Remove

    this.state = {
      user: {},
      settings: settings,
      sidemenu: {
        open: false,
        editing: false,
        node: {}
      },
      token: token,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Check if user is now logged in (user object exists)
    let nextState = {};
    if (nextProps.user && nextProps.user.hasOwnProperty('user')) {
      
      // Assign user object for state
      let user = nextProps.user.user;
      
      // Check if user is valid (check username)
      if (user.hasOwnProperty('username')) {
        // If user is valid, pass user to state
        nextState = {user: user};
      } else {
        // If user is not valid, pass error(s)
        nextState = {
          user: {},
          errors: user,
          isLoggingIn: prevState.isLoggingIn,
        };
      }

      // Save token
      localStorage.setItem('user_token', user.token);
    } 

    return nextState;
  }

  logout(e) {
    // Delete token
    localStorage.removeItem('user_token');

    // Erase user from state and rerender
    this.setState({
      user: {}
    });
  }

  updateSettings(repoSettings) {
    // Merge old settings with new ones
    let nextSettings = Object.assign(this.state.settings.repos[this.props.repo.name], repoSettings);
    console.log("updateSettings() nextSettings: ", nextSettings); // TODO --DTM-- Remove
    
    // Dispatch new settigs to redux
    this.props.dispatch(updateRepoSettings(this.props.repo, nextSettings))
  }

  changeTemplate(template) {
    // TODO --DTM-- Implement with API
    console.log('changeTemplate() template: ', template);

    // Close sidemenu
    this.setState({sidemenu: {open: false}});

    // Dispatch action creator to update template
    this.props.dispatch(changeTemplate(template))
  }

  addTemplate() {
    // TODO --DTM-- Implement
    // this.setState({
    //   sidemenu: {
    //     open: true,
    //     editing: false,
    //     node: {}
    //   }
    // });
  }

  editTemplate(template) {
    // TODO --DTM-- Implement
    // this.setState({sidemenu: {open: true}});
    console.log('editTemplate() template: ', template);
  }

  addNode() {
    // TODO --DTM-- Implement
    this.setState({
      sidemenu: {
        open: true,
        editing: false,
        node: {}
      }
    });
  }

  editNode(node) {
    // TODO --DTM-- Implement
    this.setState({
      sidemenu: {
        open: true,
        editing: true,
        node: node
      }
    });
    console.log('editNode() node: ', node);
  }

  // Render sidemenu
  renderSideMenu() {
    // Initialize variables
    const templateProps = this.state.activeTemplate.properties;
    var props = [];
    let i = 0;

    // Iterate through template properties
    for (var key in templateProps) {
      // Initialize prop
      var prop = templateProps[key];

      // Initialize path if needed
      if (!prop.path) prop.path = 'properties.'+prop.key;

      // Push property input for each prop
      props.push(<PropertyPopulator key={key} index={i} prop={prop} node={this.state.node} 
                        nodeTemplate={this.props.nodeTemplate} dispatch={this.props.dispatch} nested={false}
                        onChange={(path, value) => this.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }

  renderTemplates() {
    // Initialize variables
    let nodeTemplates = this.props.nodeTemplates, 
        nodeTemplate = this.props.nodeTemplate, 
        templateComps = [],
        label = this.props.label,
        repoSettings = this.state.settings.repos[this.props.repo.name],
        changeTemplate = this.changeTemplate,
        updateSettings = this.updateSettings,
        editTemplate = this.editTemplate,
        dispatch = this.props.dispatch;

    console.log('nodeTemplates: ', nodeTemplates);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodeTemplates ) !== '[object Array]' ) return;

    // Iterate through templates
    nodeTemplates.forEach(function (template, index) {
      // Add each template to list
      console.log('template, index: ', template, index);
      templateComps.push(
        <div key={template.id}
           className={(template.id === nodeTemplate.id) ? "list-group-item template-item active" : "list-group-item template-item" }>
          <div className="template-label-wrapper" onClick={() => changeTemplate(template)}>
            <span className="template-label" >{Helpers.formatPropKey(template.label)}</span>
          </div>
          <NodeTemplate open={(template.id === nodeTemplate.id)} repoSettings={repoSettings}
              template={template} updateSettings={updateSettings} dispatch={dispatch} />
        </div>
      );
    });
    return templateComps;
  }

  renderNodes() {
    // Initialize variables
    let nodes = this.props.nodes,
        nodeComps = [], 
        editNode = this.editNode,
        templateSettings = this.state.settings.repos[this.props.repo.name][this.props.nodeTemplate.label];

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

    // Log if user is authenticated
    // console.log("isAuthenticated(): ", isAuthenticated());
    
    // Instantiate body
    let body = "";

    // If user is empty, show login screen
    if (_.isEmpty(this.state.user)) { 
      // TODO --DTM-- REDIRECT TO LOGIN
    }

    return (
      <div className="repo-container">
        <Sidemenu 
          dispatch={this.props.dispatch}
          menuIsOpen={this.state.sidemenu.open}
          editing={this.state.sidemenu.editing}
          template={this.props.nodeTemplate}
          node={this.state.sidemenu.node} />
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">aPixHub</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <FormControl className="searchbar" type="text" placeholder="Search" />
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Logout
            </NavItem>
          </Nav>
        </Navbar>
        <h3 className="user-repo-title">
          {this.props.match.params.user} / 
          <DropdownButton title={"Movies"} key="1" id={`dropdown-basic-1`} >
            <MenuItem eventKey="1">Games</MenuItem>
            <MenuItem eventKey="2">TV Shows</MenuItem>
            {/* <MenuItem divider /> */}
          </DropdownButton>
        </h3>
        <div className="repo-panel panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="template-col col-md-6">
                <h3>Templates</h3>
                <Button bsStyle="primary" onClick={() => this.addTemplate()}>
                  <Glyphicon glyph="plus" />
                </Button>
              </div>
              <div className="node-col col-md-6">
                <h3>Nodes</h3>
                <Button bsStyle="primary" onClick={() => this.addNode()}>
                  <Glyphicon glyph="plus" />
                </Button>
                </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="template-col col-md-6">
                <div className="list-group">
                  {this.renderTemplates()}
                </div>
              </div>
              <div className="node-col col-md-6">
                {this.renderNodes()}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Repo;
