import React, { Component } from 'react';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import NodeInstancePopulator from '../NodeInstance/NodeInstancePopulator';
import PropertyPopulator from '../NodeInstance/PropertyPopulator';
import Helpers from '../../helpers.js';
import { fetchAuthUser, fetchPostUser, fetchMe } from '../../actions/users';
import './Repo.css';

class Sidemenu extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.handleSideMenuStateChange = this.handleSideMenuStateChange.bind(this);
    this.openSideMenu = this.openSideMenu.bind(this);
    this.closeSideMenu = this.closeSideMenu.bind(this);
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.renderSideMenu = this.renderSideMenu.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.editTemplate = this.editTemplate.bind(this);
    this.editNode = this.editNode.bind(this);

    this.state = {
      user: {},
      menuIsOpen: props.menuIsOpen,
      editing: props.editing,
      node: props.node,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var nextState = {
      menuIsOpen: nextProps.menuIsOpen
    }
    
    return nextState; 
  }

  // This keeps the state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleSideMenuStateChange(state) {
    this.setState({menuIsOpen: state.isOpen})  
  }

  // This can be used to open the menu, e.g. when a user clicks an edit button
  openSideMenu() {
    this.setState({menuIsOpen: true})
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeSideMenu() {
    this.setState({menuIsOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleSideMenu () {
    this.setState({menuIsOpen: !this.state.menuIsOpen})
  }

  changeTemplate(template) {
    // TODO --DTM-- Implement
    console.log('changeTemplate() template: ', template);
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
    // const templateProps = this.state.activeTemplate.properties;
    var props = [];
    let i = 0;

    // // Iterate through template properties
    // for (var key in templateProps) {
    //   // Initialize prop
    //   var prop = templateProps[key];

    //   // Initialize path if needed
    //   if (!prop.path) prop.path = 'properties.'+prop.key;

    //   // Push property input for each prop
    //   props.push(<PropertyPopulator key={key} index={i} prop={prop} node={this.state.node} 
    //                     nodeTemplate={this.props.nodeTemplate} dispatch={this.props.dispatch} nested={false}
    //                     onChange={(path, value) => this.setProperty(path, value)} />); // TODO --DM-- manage keys for iteration
    //   props.push(<br key={key.toString()+'1000'} />)

    //   // Increment index
    //   i++;
    // }

    return props;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <Menu right
        width={ '325px' }
        isOpen={this.state.menuIsOpen}
        onStateChange={(state) => this.handleSideMenuStateChange(state)} >
        <div className="sidemenu-header">{(this.props.editing) ? "Edit Node" : "Add Node" }</div>
        <NodeInstancePopulator 
          dispatch={this.props.dispatch}
          editing={this.props.editing} 
          template={this.props.template} 
          node={this.props.node} />
        {this.renderSideMenu()}
      </Menu>
    );
  }
}

export default Sidemenu;