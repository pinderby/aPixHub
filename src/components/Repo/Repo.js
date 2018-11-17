import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Button, Glyphicon, FormControl } from 'react-bootstrap';
import Sidemenu from './Sidemenu';
import PropertyPopulator from '../NodeInstance/PropertyPopulator';
import TemplatesPanel from '../TemplatesPanel/TemplatesPanel';
import NodesPanel from '../NodesPanel/NodesPanel';
import Helpers from '../../helpers.js';
import { TemplateTypes } from '../../constants/OtherConstants';
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
    this.handleSideMenuStateChange = this.handleSideMenuStateChange.bind(this);
    this.changeTemplateType = this.changeTemplateType.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.addTemplate = this.addTemplate.bind(this);
    this.editTemplate = this.editTemplate.bind(this);
    this.addNode = this.addNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.saveNode = this.saveNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
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
        node: {},
        index: 0
      },
      token: token,
      templateType: TemplateTypes.NODE,
      nodeTemplates: props.nodeTemplates,
      allNodes: props.nodes,
      activeTemplate: { id: "", label: "" },
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

  // Update sidemenu state
  handleSideMenuStateChange(isOpen, isEditing, node = {}, index) {
    console.log("handleSideMenuStateChange(): isOpen, isEditing, node ", isOpen, isEditing, node);
    this.setState({ 
      sidemenu: { 
        open: isOpen,
        editing: isEditing,
        node: node,
        index: index
      } 
    });
  }

  updateSettings(repoSettings) {
    // Merge old settings with new ones
    let nextSettings = Object.assign(this.state.settings.repos[this.props.repo.name], repoSettings);
    console.log("updateSettings() nextSettings: ", nextSettings); // TODO --DTM-- Remove
    
    // Dispatch new settigs to redux
    this.props.dispatch(updateRepoSettings(this.props.repo, nextSettings))
  }

  changeTemplateType(templateType) {
    console.log('changeTemplateType() templateType: ', templateType); // TODO --DTM-- Remove

    // Update template type in state
    this.setState({ templateType: templateType });
  }

  changeTemplate(template) {
    // TODO --DTM-- Implement with API
    console.log('changeTemplate() template: ', template);  // TODO --DTM-- Remove

    this.setState((prevState, props) => {
      // Add new template to state
      return { 
        activeTemplate: template
      };
    });

    // TODO --DTM-- Delete?
    // // Close sidemenu
    // this.setState({sidemenu: {open: false}});
    
    // // Dispatch action creator to update template
    // this.props.dispatch(changeTemplate(template))
  }

  addTemplate() {
    console.log("addTemplate(): " + this.state.nodeTemplates.length); // TODO --DTM-- Remove
    
    // Generate new template
    let newTemplate = {
      "id": this.state.nodeTemplates.length,
      "label": "",
      "properties": [
        {
          "id": 0,
          "key": "name",
          "value_type": "string",
        }
      ],
      "in_relationships": [],
      "out_relationships": []
    };

    // Update component state
    this.setState((prevState, props) => {
      // Add new template to state
      return { 
        nodeTemplates: [...prevState.nodeTemplates, newTemplate],
        activeTemplate: newTemplate
      };
    });
  }

  editTemplate(template) {
    // TODO --DTM-- Implement
    // this.setState({sidemenu: {open: true}});
    console.log('editTemplate() template: ', template);
  }

  addNode() {
    // Return if no template is selected
    if (!this.state.activeTemplate || _.isEmpty(this.state.activeTemplate.label)) return;

    // If active template is selected, open sidemenu
    this.setState({
      sidemenu: {
        open: true,
        editing: false,
        node: {}
      }
    });
  }

  editNode(node, index) {
    // TODO --DTM-- Implement
    this.setState({
      sidemenu: {
        open: true,
        editing: true,
        node: node,
        index: index
      }
    });
    console.log('editNode() node, index: ', node, index); // TODO --DTM-- Remove
  }

  saveNode(templateLabel, node, index) {
    console.log("saveNode(): templateLabel, node, index ", templateLabel, node, index);  // TODO --DTM-- Remove

    // Initialize variables
    let nextAllNodes;

    // Copy current nodes
    nextAllNodes = { ...this.state.allNodes }

    if (typeof index === 'undefined') {
      // If index not defined, push new node into array
      node.nid = nextAllNodes[templateLabel].length;
      nextAllNodes[templateLabel].push(node);
    } else {
      // If index exists, update node in allNodes
      nextAllNodes[templateLabel][index] = node;
    }
    
    // Update state.allNodes, reset sidemenu state
    this.setState({
      allNodes: nextAllNodes,
      sidemenu: { 
        open: false,
        editing: false,
        node: {}
      } 
    });
  }

  deleteNode(templateLabel, index) {
    console.log("deleteNode(): templateLabel, index ", templateLabel, index);  // TODO --DTM-- Remove

    // Initialize variables
    let nextAllNodes;

    // Copy current nodes
    nextAllNodes = { ...this.state.allNodes }

    // Remove node to be deleted
    nextAllNodes[templateLabel].splice(index, 1);
    
    // Update state.allNodes, reset sidemenu state
    this.setState({
      allNodes: nextAllNodes,
      sidemenu: { 
        open: false,
        editing: false,
        node: {}
      } 
    });
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
                        nodeTemplate={this.state.activeTemplate} dispatch={this.props.dispatch} nested={false}
                        onChange={(path, value) => this.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
      props.push(<br key={key.toString()+'1000'} />)

      // Increment index
      i++;
    }

    return props;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // Log if user is authenticated
    // console.log("isAuthenticated(): ", isAuthenticated());
    
    // Filter nodes and settings for NodesPanel based on activeTemplate
    let nodes = (this.state.allNodes[this.state.activeTemplate.label]) ? this.state.allNodes[this.state.activeTemplate.label] : [];
    let templateSettings = this.props.settings.repos[this.props.repo.name][this.state.activeTemplate.label];

    // If user is empty, show login screen
    if (_.isEmpty(this.state.user)) { 
      // TODO --DTM-- REDIRECT TO LOGIN
    }

    return (
      <div id="repo-container" className="repo-container">
        <Sidemenu 
          dispatch={this.props.dispatch}
          menuIsOpen={this.state.sidemenu.open}
          editing={this.state.sidemenu.editing}
          template={this.state.activeTemplate}
          node={this.state.sidemenu.node}
          index={this.state.sidemenu.index}
          handleSideMenuStateChange={this.handleSideMenuStateChange}
          saveNode={this.saveNode}
          deleteNode={this.deleteNode} />
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
        <div id="repo-panel" className="repo-panel panel panel-default">
          <div className="row">
            <div className="template-col">
              <TemplatesPanel 
                templateType={this.state.templateType}
                activeTemplate={this.state.activeTemplate}
                nodeTemplates={this.state.nodeTemplates}
                label={this.props.label}
                repoSettings={this.state.settings.repos[this.props.repo.name]}
                addTemplate={this.addTemplate}
                changeTemplate={this.changeTemplate}
                editTemplate={this.editTemplate}
                updateSettings={this.updateSettings} />
              {/* <div className="panel-heading">
                <h3>
                  {this.renderTemplateDropdown()}
                </h3>
                <Button className="create-template-btn" bsStyle="primary" onClick={() => this.addTemplate()}>
                  <Glyphicon glyph="plus" />
                </Button>
              </div>
              <div className="panel-body">
                <div className="list-group">
                  {this.renderTemplates(this.state.templateType)}
                </div>
              </div> */}
            </div>
            <div className="node-col">
              <NodesPanel 
                activeTemplate={this.state.activeTemplate}
                settings={this.state.settings}
                repo={this.props.repo}
                nodes={nodes}
                templateSettings={templateSettings}
                editNode={this.editNode}
                addNode={this.addNode} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Repo.propTypes = {
  repo: PropTypes.object.isRequired,
  nodeTemplates: PropTypes.array.isRequired
};

export default Repo;
