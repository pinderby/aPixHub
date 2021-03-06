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
      // TODO --DTM--
    };
  }

  renderTemplateDropdown() {
    let menuItems = [];

    // Create and push non-selected MenuItems
    for (let i = 0; i < 3; i++) { 
      if (i !== this.props.templateType) menuItems.push(
        <MenuItem key={i} eventKey={i} className="template-menu-item"
            onClick={() => this.props.changeTemplateType(i)}>
          {TemplateTypes.getTypeTitle(i) + "s"}
        </MenuItem>
      );
    }

    // Return dropdown with MenuItems
    return (
      <DropdownButton title={TemplateTypes.getTypeTitle(this.props.templateType) + "s"} 
            key="0" className="template-panel-dropdown"
            bsSize="large" id={`dropdown-basic`} >
        {menuItems}
      </DropdownButton>
    );
  }

  renderTemplates(templateType) {
    // Initialize variables
    let templateComps = [],
        templates = [], 
        activeTemplate = this.props.activeTemplate, 
        repoSettings = this.props.repoSettings,
        nodeTemplates = this.props.nodeTemplates,
        changeTemplate = this.props.changeTemplate,
        updateTemplate = this.props.updateTemplate,
        updateSettings = this.props.updateSettings;

    // Assign templates based on template type
    switch(templateType) {
      case TemplateTypes.NODE:
        templates = this.props.nodeTemplates;
        break;
      case TemplateTypes.RELATIONSHIP:
        templates = this.props.relationshipTemplates;
        break;
      case TemplateTypes.INTERFACE:
        templates = this.props.interfaces;
        break;
      default:
        console.log("renderTemplates() template type error: ", this.props.templateType);
    }

    console.log('templates: ', templates); // TODO --DTM-- Remove

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( templates ) !== '[object Array]' ) return;

    // Determine if template type is relationship
    let isRelationship = false;
    if (templateType === TemplateTypes.RELATIONSHIP) isRelationship = true;

    // Iterate through templates
    templates.forEach(function (template, index) {
      // Add each template to list
      console.log('template, index: ', template, index);
      
      // TODO --DTM-- Remove. Temp assignment of template based on first load or state update (will not hold state)
      var temp;
      if (template.id === activeTemplate.id) (temp = activeTemplate); else (temp = template);

      templateComps.push(
          <NodeTemplate 
            key={template.id} 
            index={index}
            open={(template.id === activeTemplate.id)} 
            repoSettings={repoSettings}
            nodeTemplates={nodeTemplates}
            templateType={templateType}
            template={temp}
            isRelationship={isRelationship}
            updateSettings={updateSettings} 
            changeTemplate={changeTemplate}
            updateTemplate={updateTemplate} />
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