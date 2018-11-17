import React, { Component } from 'react';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { Button, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import NodeTemplate from './NodeTemplate';
import Helpers from '../../helpers.js';
import { TemplateTypes } from '../../constants/OtherConstants';

class TemplatesPanel extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderTemplateDropdown = this.renderTemplateDropdown.bind(this);
    this.renderTemplates = this.renderTemplates.bind(this);

    // Initialize state
    this.state = {
      user: {},
      query: "",
      queryProp: "",
      editing: props.editing,
      node: props.node,
      showPopover: false
    };
  }

  renderTemplateDropdown() {
    let menuItems = [];

    // Create and push non-selected MenuItems
    for (let i = 0; i < 3; i++) { 
      if (i !== this.state.templateType) menuItems.push(
        <MenuItem key={i} eventKey={i} onClick={() => this.changeTemplateType(i)}>
          {TemplateTypes.getTypeTitle(i) + "s"}
        </MenuItem>
      );
    }

    // Return dropdown with MenuItems
    return (
      <DropdownButton title={TemplateTypes.getTypeTitle(this.state.templateType) + "s"} 
            key="0" className="template-panel-dropdown"
            bsSize="large" id={`dropdown-basic`} >
        {menuItems}
      </DropdownButton>
    );
  }

  renderTemplates(templateType) {
    // Initialize variables
    let nodeTemplates = this.props.nodeTemplates, 
        nodeTemplate = this.props.activeTemplate, 
        templateComps = [],
        label = this.props.label,
        repoSettings = this.props.repoSettings,
        changeTemplate = this.props.changeTemplate,
        updateSettings = this.props.updateSettings,
        editTemplate = this.props.editTemplate;

    console.log('nodeTemplates: ', nodeTemplates); // TODO --DTM-- Remove

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( nodeTemplates ) !== '[object Array]' ) return;

    // Iterate through templates
    nodeTemplates.forEach(function (template, index) {
      // Add each template to list
      console.log('template, index: ', template, index);
      
      // TODO --DTM-- Remove. Temp assignment of template based on first load or state update (will not hold state)
      var temp;
      if (template.id === nodeTemplate.id) (temp = nodeTemplate); else (temp = template);

      templateComps.push(
          <NodeTemplate 
            key={template.id} 
            open={(template.id === nodeTemplate.id)} 
            repoSettings={repoSettings}
            template={temp} 
            updateSettings={updateSettings} 
            changeTemplate={changeTemplate} />
      );
    });
    return templateComps;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    return (
      <div className="templates-panel-container">
        <div className="panel-heading">
          <h3>
            {this.renderTemplateDropdown()}
          </h3>
          <Button className="create-template-btn" bsStyle="primary" onClick={this.props.addTemplate}>
            <Glyphicon glyph="plus" />
          </Button>
        </div>
        <div className="panel-body">
          <div className="list-group">
            {this.renderTemplates(this.props.templateType)}
          </div>
        </div>
      </div>
    );
  }
}

export default TemplatesPanel;