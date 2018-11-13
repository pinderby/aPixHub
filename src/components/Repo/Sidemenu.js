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
    this.editNode = this.editNode.bind(this);

    this.state = {
      user: {},
      menuIsOpen: props.menuIsOpen,
      editing: props.editing,
      node: props.node,
    };
  }

  // This keeps the state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleSideMenuStateChange(state) {
    console.log("handleSideMenuStateChange(state): ", state.isOpen);
    this.setState({menuIsOpen: state.isOpen}); // TODO --DTM-- Remove
    this.props.handleSideMenuStateChange(state.isOpen, this.props.editing, this.props.node, this.props.index);
  }

  // This can be used to open the menu, e.g. when a user clicks an edit button
  openSideMenu() {
    this.setState({menuIsOpen: true});
    this.props.handleSideMenuStateChange(true, this.props.editing, this.props.node, this.props.index);
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeSideMenu() {
    this.setState({menuIsOpen: false}); // TODO --DTM-- Remove
    this.props.handleSideMenuStateChange(false, this.props.editing, this.props.node, this.props.index);
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleSideMenu() {
    this.setState({menuIsOpen: !this.state.menuIsOpen}); // TODO --DTM-- Remove
    this.props.handleSideMenuStateChange(!this.state.menuIsOpen, this.props.editing, this.props.node, this.props.index);
  }

  editNode(node) {
    // TODO --DTM-- Implement
    this.setState({menuIsOpen: true}); // TODO --DTM-- Remove
    console.log('editNode() node: ', node);
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <Menu right
        width={ '325px' }
        isOpen={this.props.menuIsOpen}
        onStateChange={(state) => this.handleSideMenuStateChange(state)} >
        <div className="sidemenu-header">{(this.props.editing) ? "Edit Node" : "Add Node" }</div>
        <NodeInstancePopulator 
          dispatch={this.props.dispatch}
          editing={this.props.editing} 
          template={this.props.template}
          node={this.props.node}
          index={this.props.index}
          saveNode={this.props.saveNode}
          deleteNode={this.props.deleteNode} />
      </Menu>
    );
  }
}

export default Sidemenu;