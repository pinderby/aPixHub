import React, { Component } from 'react';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import NodeSearchResult from '../NodeInstance/NodeSearchResult';
import PropertyPopulator from '../NodeInstance/PropertyPopulator';
import Sidemenu from './Sidemenu';
import Helpers from '../../helpers.js';
import { fetchAuthUser, fetchPostUser, fetchMe } from '../../actions/users';
import { updateNodeTemplate } from '../../actions/templates';
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
    this.editTemplate = this.editTemplate.bind(this);
    this.editNode = this.editNode.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      user: {},
      menuIsOpen: false,
      activeTemplate: props.nodeTemplates['0'],
      editing: {
        type: 0, // 0 = nothing, 1 = template, 2 = node
        template: {},
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

  changeTemplate(template) {
    // TODO --DTM-- Implement with API
    console.log('changeTemplate() template: ', template);

    // Dispatch action creator to update template
    this.props.dispatch(updateNodeTemplate(template))
  }

  editTemplate(template) {
    // TODO --DTM-- Implement
    console.log('editTemplate() template: ', template);
  }

  editNode(node) {
    // TODO --DTM-- Implement
    this.setState({menuIsOpen: true})
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
        changeTemplate = this.changeTemplate;

    console.log('nodeTemplates: ', nodeTemplates);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodeTemplates ) !== '[object Array]' ) return;

    // Iterate through templates
    nodeTemplates.forEach(function (template, index) {
      // Add each template to list
      console.log('template, index: ', template, index);
      templateComps.push(
        <a key={template.id} href="#" onClick={() => changeTemplate(template)} 
           className={(template.id === nodeTemplate.id) ? "list-group-item active" : "list-group-item" }>
          {Helpers.formatPropKey(template.label)}
        </a>
      );
    });
    return templateComps;
  }

  renderNodes() {
    // Initialize variables
    let nodes = this.props.nodes,
        nodeComps = [], 
        editNode = this.editNode;

    console.log('nodes: ', nodes);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodes ) !== '[object Array]' ) return;

    // Iterate through nodes
    nodes.forEach(function (node, index) {
      // Wrap router link and render props in NodeSearchResult
      nodeComps.push(
        <a key={node.nid} href="#" onClick={() => editNode(node)} className="">
          <NodeSearchResult key={index} node={node} />
        </a>
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
          menuIsOpen={this.state.menuIsOpen}
          nodeTemplates={this.props.nodeTemplates} />
        <div className="nodes-panel panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.props.match.params.user} / 
              <DropdownButton title={"Movies"} >
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>
                  Active Item
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Separated link</MenuItem>
              </DropdownButton>
            </h3>
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
