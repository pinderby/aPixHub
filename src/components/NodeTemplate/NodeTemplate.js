import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import { Link } from 'react-router-dom';
import { Table, Collapse, Checkbox, Button, Glyphicon } from 'react-bootstrap';
// import './NodeTemplate.css'
import './TemplateSearch.css';
import EditableInput from '../EditableInput'
import LoadingOverlay from '../LoadingOverlay';
import { InputTypes } from '../../constants/PropertyTypes';
import { fetchTemplate, updateNodeTemplate, fetchDeleteTemplate } from '../../actions/templates';

class NodeTemplate extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.updateTemplateField = this.updateTemplateField.bind(this);
    this.renderTemplateProps = this.renderTemplateProps.bind(this);
    this.renderTemplateRels = this.renderTemplateRels.bind(this);
    this.onPropChanged = this.onPropChanged.bind(this);
    this.updateEditing = this.updateEditing.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);

    // TODO --DTM-- Remove?
    // // If nodeTemplate doesn't exist, query it from server
    // if (!props.nodeTemplate.template) {
    //   this.getTemplate(props.match.params.label);
    //   this.state = {
    //     nodeTemplate: { isFetching: true },
    //   };
    //   return;
    // }

    this.state = {
      template: props.template,
      editing: false
    };
  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  updateTemplateField(event, propKey) {
    console.log('updateTemplateField(): ', event.target.checked, propKey); // TODO --DM-- Remove
    
    // Duplicate repoSettings to update
    let nextRepoSettings = Object.assign(this.props.repoSettings, {});

    // If propKey doesn't exist in repoSettings, add it
    if (!nextRepoSettings[this.props.template.label].hasOwnProperty(propKey)) nextRepoSettings[this.props.template.label][propKey] = {};

    // Update display settings for propKey
    nextRepoSettings[this.props.template.label][propKey]['display'] = event.target.checked;

    console.log('updateTemplateField() repoSettings: ', nextRepoSettings); // TODO --DM-- Remove
    // Update settings globally
    this.props.updateSettings(nextRepoSettings);
  }

  updateTemplate() {
    // Update editing state
    this.setState((prevState, props) => {
      return { editing: !this.state.editing };
    });

    // Dispatch updateNodeTemplate to update template in redux
    this.props.dispatch(updateNodeTemplate(this.state.template));
  }

  deleteTemplate(templateId) {
    // Dispatch fetchDeleteTemplate to delete template by id
    this.props.dispatch(fetchDeleteTemplate(templateId));
  }

  onPropChanged(index, key, value) {
    // Update new value to state
    console.log('this.state.template: ', this.state.template); // TODO --DM-- Remove
    console.log('key, value ', key, value); // TODO --DM-- Remove

    // Assign new property value
    var template = Object.assign({}, this.state.template);
    template.properties[index][key] = value;
    
    // Update state with updated template
    this.setState(() => {
      return {
        template: template
      };
    });
  }

  updateEditing() {
    // Update editing state
    if (this.state.editing) {
      // If currently editing, call cancelEditing()
      this.cancelEditing();
    } else {
      // If not editing, start editing
      this.setState((prevState, props) => {
        return { editing: !this.state.editing };
      });
    }
  }

  cancelEditing() {
    // Update editing state and revert back to props
    this.setState((prevState, props) => {
      return { 
        template: this.props.template,
        editing: false
      };
    });
  }

  // Render template properties
  renderTemplateProps(props) {
    var propComps = [];
    console.log('props: ', props); // TODO --DM-- Remove
    
    // If props is empty, return
    if (!props) return;

    // If props is an array and has at least one key, render components
    if (props.length >= 1 && Object.prototype.toString.call( props ) === '[object Array]' ) {
      // Add nid prop for all templates
      propComps.push(
        <tr key={'id'} className="template-prop">
          <td>{"nid"}</td>
          <td>{"ID"}</td>
          <td>
            <Checkbox defaultChecked onChange={(e) => updateTemplateField(e, 'nid')} />
          </td>
        </tr>
      );
      
      // Push row for all other properties
      // Bind method for updating template field
      var updateTemplateField = this.updateTemplateField, 
          state = this.state, onPropChanged = this.onPropChanged;
      props.forEach(function(prop, index) {
        var propKey = prop.key;
        let checked = true;
        propComps.push(
          <tr key={'div-'+prop['id']} className="template-prop">
            <td><EditableInput propIndex={index} propKey='key' value={prop['key']} disabled={false} 
                  editing={state.editing} inputType={InputTypes.TEXT} 
                  onChange={(index, key, value) => onPropChanged(index, key, value)} /></td>
            <td><EditableInput propIndex={index} propKey='value_type' value={prop['value_type']} disabled={true} 
                  editing={state.editing} inputType={InputTypes.SELECT} 
                  onChange={(index, key, value) => onPropChanged(index, key, value)} /></td>
            <td>
              <Checkbox defaultChecked onChange={(e) => updateTemplateField(e, prop.key)} />
            </td>
          </tr>
        );
      });
      return propComps;
    }
    return;
  }

    // Render template properties
    renderTemplateRels(rels, isIn) {
      // console.log('rels: ', rels); // TODO --DM-- Remove
      var relComps = [];
      
      // If rels is empty, return
      if (!rels) return;
  
      // If rels is an array and has at least entry, render components
      if (rels.length >= 1 && Object.prototype.toString.call( rels ) === '[object Array]' ) {
        // Add id prop for all relationships
        // TODO --DTM-- How are we handling ids?
        // relComps.push(
        //   <tr className="template-rel-prop">
        //     <td>{"id"}</td>
        //     <td>{"ID"}</td>
        //   </tr>
        // );
        
        // Push rows for relationship
        rels.forEach(function(rel) {
          // console.log('rel: ', rel); // TODO --DM-- Remove
          // Combine all template props
          let propComps = [];
          
          // If props is an array and has at least one key, render components
          if (rel.properties.length >= 1 && Object.prototype.toString.call( rel.properties ) === '[object Array]' ) {
            // Push row for all properties
            rel.properties.forEach(function(prop) {
              propComps.push(
                <tr key={'div-'+prop['id']} className="template-prop">
                  <td>{prop['key']}</td>
                  <td>{prop['value_type']}</td>
                </tr>
              );
            });
          }

          // Push row for relationship including properties
          relComps.push(
            <tr key={'div-'+rel['id']} className="template-rel">
              <th colSpan="2">
                <span className="rel-title">{(isIn) ? rel.rel_type + " (IN); " : rel.rel_type + " (OUT); " }</span>
                {(isIn) ? "From: " : "To: " }
                {/* TODO --DTM-- Implement with real id reference */}
                <a>{(isIn) ? rel["from_node_id"] : rel["to_node_id"] }</a>
              </th>
            </tr>
          );
          relComps.push(propComps);
        });
        return relComps;
      }
      return;
    }

  render() {  
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // If template exists, generate template panel
    let templatePanel = "";
    if (this.props.template) {
      // Initialize template and display label
      let template = this.props.template, 
      displayLabel = Helpers.capitalizeFirstLetter(template['label']);

      templatePanel =
        <div className="apix-template">
          <Button className="template-edit-btn" onClick={() => this.updateEditing()}>
            <Glyphicon glyph="pencil" />
          </Button>
          <div className="panel panel-default">
            <div className="panel-body">
            {/* TODO --DTM-- Move all this functionality into other components */}
              {/* <div className="row">
                <Link key={template['id']+'-edit'} to={"/t/"+template['label']+"/edit" }>Edit Template</Link>
                <br />
                <Link key={template['id']+'-add'} to={"/n/"+template['label']+"/add" }>Add {displayLabel}</Link>
                <br />
                <Link key={template['id']+'-search'} to={"/n/"+template['label']+"/search" }>Search {displayLabel}</Link>
                <br />
                <a key={template['id']+'-delete'} onClick={() => this.deleteTemplate(template.id)} >Delete {displayLabel}</a>
              </div> */}
              {/* Template Properties Table */}
              <Table striped bordered hover className="template-table">
                <thead>
                  <tr className="template-table-header">
                    <th colSpan="3">Template Properties</th>
                  </tr>
                  <tr>
                    <th>Key</th>
                    <th>Value Type</th>
                    <th>Show?</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTemplateProps(template.properties)}
                </tbody>
              </Table>

              {/* Template Relationships Table */}
              <Table striped bordered hover className="template-table">
                <thead>
                  <tr className="template-table-header">
                    <th colSpan="2">Template Relationships</th>
                  </tr>
                  <tr>
                    <th>Key</th>
                    <th>Value Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTemplateRels(template.in_relationships, true)}
                  {this.renderTemplateRels(template.out_relationships, false)}
                </tbody>
              </Table>
              <Button className={this.state.editing ? "template-submit-btn" : "hidden"}
                bsStyle="primary" onClick={() => this.updateTemplate()} >Update Template</Button>
              <Button className={this.state.editing ? "template-cancel-btn" : "hidden"}
                onClick={() => this.cancelEditing()}>Cancel</Button>
            </div>
          </div>
        </div>
      
      console.log('Template:', template); // TODO --DTM-- Remove
    }

    return (
      <Collapse in={this.props.open}>
        <div className="template-container">
          {/* TODO --DTM-- Remove */}
          {/* <LoadingOverlay show={this.props.nodeTemplate.isFetching} /> */} 
          {templatePanel}
        </div>
      </Collapse>
    );
  }
}



export default NodeTemplate;