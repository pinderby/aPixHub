import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import clonedeep from 'lodash.clonedeep';
import _ from 'lodash';
import Autocomplete from 'react-autocomplete';
import { Table, Collapse, Checkbox, Button, Glyphicon, Modal } from 'react-bootstrap';
// import './NodeTemplate.css'
import './TemplateSearch.css';
import EditableInput from '../EditableInput'
import { InputTypes } from '../../constants/PropertyTypes';
import { fetchTemplate, updateNodeTemplate, fetchDeleteTemplate } from '../../actions/templates';
import TemplateTypes from '../../constants/OtherConstants.js';

class NodeTemplate extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.updateTemplateField = this.updateTemplateField.bind(this);
    this.renderTemplate = this.renderTemplate.bind(this);
    this.renderTemplatePropsTable = this.renderTemplatePropsTable.bind(this);
    this.renderRelatedTemplates = this.renderRelatedTemplates.bind(this);
    this.renderRelPropsTable = this.renderRelPropsTable.bind(this);
    this.renderTemplateProps = this.renderTemplateProps.bind(this);
    this.renderTemplateRels = this.renderTemplateRels.bind(this);
    this.renderRemovePropModal = this.renderRemovePropModal.bind(this);
    this.addPropToTemplate = this.addPropToTemplate.bind(this);
    this.addPropToRel = this.addPropToRel.bind(this);
    this.removePropFromTemplate = this.removePropFromTemplate.bind(this);
    this.removePropFromRel = this.removePropFromRel.bind(this);
    this.closeRemovePropModal = this.closeRemovePropModal.bind(this);
    this.onLabelChanged = this.onLabelChanged.bind(this);
    this.onRelTypeChanged = this.onRelTypeChanged.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.onPropChanged = this.onPropChanged.bind(this);
    this.onRelPropChanged = this.onRelPropChanged.bind(this);
    this.updateEditing = this.updateEditing.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);

    // Check if template is new
    // If so, default editing to true
    let editing = (props.template.label === "" || props.template.rel_type === "") ? true : false;

    this.state = {
      template: props.template,
      editing: editing,
      showRemovePropModal: false,
      propToRemove: {},
      relatedTemplates: {
        toTemplate: { label: "" },
        toQuery: "",
        fromTemplate: { label: "" },
        fromQuery: ""
      }
    };
  }

  // Automatically set editing to false if not active
  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) this.setState({ editing: false });
    
    // Set relatedTemplates if template opened and isRelationship
    if (!prevProps.open && this.props.open && this.props.isRelationship) {
      // Initialize variables
      let toTemplate = { label: "" },
          toQuery = "",
          fromTemplate = { label: "" },
          fromQuery = "";

      // Find related templates
      this.props.nodeTemplates.forEach((template, index) => {
        if (template.id === this.props.template.to_node_id) {
          toTemplate = template;
          toQuery = Helpers.formatPropKey(template.label);
        }
        if (template.id === this.props.template.from_node_id) {
          fromTemplate = template;
          fromQuery = Helpers.formatPropKey(template.label);
        }
      });
      
      // Update state with relatedTemplates
      this.setState({ 
        relatedTemplates: {
          toTemplate: toTemplate,
          toQuery: toQuery,
          fromTemplate: fromTemplate,
          fromQuery: fromQuery
        }
       });
    }
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
      return { editing: !prevState.editing };
    });

    // Dispatch updateNodeTemplate to update template in redux
    this.props.dispatch(updateNodeTemplate(this.state.template));
  }

  deleteTemplate(templateId) {
    // Dispatch fetchDeleteTemplate to delete template by id
    this.props.dispatch(fetchDeleteTemplate(templateId));
  }

  changeTemplate(template) {
    // Change template only if it's not already active
    if (!this.props.open) this.props.changeTemplate(template);
    else return;
  }

  addPropToTemplate(properties) {
    console.log("addPropToTemplate(): " + properties.length); // TODO --DTM-- Remove

    // Update component state
    this.setState((prevState, props) => {
      // Add property to template
      let nextTemplate = {...prevState.template};
      nextTemplate.properties.push({
        "id": properties.length,
        "key": "new_property",
        "value_type": "string",
        "disabled": false,
        "new_prop": true
      });

      return { 
        template: nextTemplate,
        editing: true
      };
    });
  }

  removePropFromTemplate(prop, index, showModal) {
    console.log("removePropFromTemplate(): " + prop, index, showModal); // TODO --DTM-- Remove
    
    // Show modal if confirmation needed
    if (showModal) { 
      this.setState({ 
        showRemovePropModal: true,
        propToRemove: Object.assign(prop, {
          index: {
            isIn: true,
            relIndex: -1,
            propIndex: index
          }})
      });
    } else {
      // Update component state
      this.setState((prevState, props) => {
        // If modal is not needed, remove property from template
        let nextTemplate = {...prevState.template};
        nextTemplate.properties.splice(index, 1);

        return { 
          template: nextTemplate,
          editing: true,
          showRemovePropModal: false,
          propToRemove: {}
        };
      });
    }
  }

  addPropToRel(isIn, relIndex, relProperties) {
    console.log("addPropToRel(): ", isIn, relIndex, relProperties); // TODO --DTM-- Remove

    // Update component state
    this.setState((prevState, props) => {
      // Instantiate and update nextTemplate object
      let nextTemplate = clonedeep(prevState.template);

      // Add property to relationship
      nextTemplate[Helpers.getRelDirKey(isIn)][relIndex]['properties'].push({
        "id": relProperties.length,
        "key": "new_property",
        "value_type": "string",
        "disabled": false,
        "new_prop": true
      });
      
      return { 
        template: nextTemplate,
        editing: true
      };
    });
  }

  removePropFromRel(isIn, relIndex, prop, propIndex, showModal) {
    console.log("removePropFromTemplate(): " + isIn, relIndex, prop, propIndex, showModal); // TODO --DTM-- Remove
    
    // Show modal if confirmation needed
    if (showModal) { 
      this.setState({ 
        showRemovePropModal: true,
        propToRemove: Object.assign(prop, {
          index: {
            isIn: isIn,
            relIndex: relIndex,
            propIndex: propIndex
          }})
      });
    } else {
      // Update component state
      this.setState((prevState, props) => {
        // If modal is not needed, remove property from template
        let nextTemplate = clonedeep(prevState.template);
        nextTemplate[Helpers.getRelDirKey(isIn)][relIndex]['properties'].splice(propIndex, 1);

        return { 
          template: nextTemplate,
          editing: true,
          showRemovePropModal: false,
          propToRemove: {}
        };
      });
    }
  }

  onLabelChanged(nextlabel) {
    // Update new value to state
    console.log('this.state.template: ', this.state.template); // TODO --DM-- Remove
    console.log('label ', nextlabel); // TODO --DM-- Remove
    
    // Update state with updated template
    this.setState((prevState, props) => {
      // Assign new property value
      let nextTemplate = {...prevState.template};
      nextTemplate.label = _.snakeCase(nextlabel);
      
      return { 
        template: nextTemplate,
      };
    });
  }

  onRelTypeChanged(nextRelType) {
    // Update new value to state
    console.log('this.state.template: ', this.state.template); // TODO --DM-- Remove
    console.log('rel_type: ', nextRelType); // TODO --DM-- Remove
    
    // Update state with updated template
    this.setState((prevState, props) => {
      // Assign new property value
      let nextTemplate = {...prevState.template};
      nextTemplate.rel_type = nextRelType.split(' ').join('_').toUpperCase();
      
      return { 
        template: nextTemplate,
      };
    });
  }

  onPropChanged(index, key, value) {
    // Update new value to state
    console.log('onPropChanged() index, key, value: ', index, key, value); // TODO --DM-- Remove
    
    // Update state with updated template
    this.setState((prevState, props) => {
      // Assign new property value
      let nextTemplate = {...prevState.template};
      nextTemplate.properties[index][key] = value;
      
      return { 
        template: nextTemplate,
      };
    });
  }

  onRelPropChanged(isIn, relIndex, propIndex, key, value) {
    // Update new value to state
    console.log('isIn, relIndex, propIndex, key, value: ', isIn, relIndex, propIndex, key, value); // TODO --DM-- Remove

    // Update state with updated template
    this.setState((prevState, props) => {
      // Assign new property value
      let nextTemplate = clonedeep(prevState.template);
      nextTemplate[Helpers.getRelDirKey(isIn)][relIndex]['properties'][propIndex][key] = value;
      
      return { 
        template: nextTemplate
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
        editing: false
      };
    });
  }

  closeRemovePropModal() {
    this.setState({ 
      showRemovePropModal: false,
      propToRemove: {} });
  }

  renderTemplate() {
    // If template doesn't exist, return
    if (!this.props.template) return;

    // If template exists, return template
    console.log('Template:', this.state.template); // TODO --DTM-- Remove
    return(
      <div className="apix-template">
        <div className="panel panel-default">
          <div className="panel-body">
            {/* From / To Nodes for Relationship Template */}
            {this.renderRelatedTemplates(this.state.relatedTemplates)}
            
            {/* Template Properties Table */}
            {this.renderTemplatePropsTable(this.state.template)}

            {/* Template Relationships Table */}
            {this.renderRelPropsTable(this.state.template)}

            <Button className={this.state.editing ? "template-submit-btn" : "hidden"}
              bsStyle="primary" onClick={() => this.updateTemplate()} >Update Template</Button>
            <Button className={this.state.editing ? "template-cancel-btn" : "hidden"}
              onClick={() => this.cancelEditing()}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }

  renderRelatedTemplates(relatedTemplates) {
    // If not relationship, return
    if (!this.props.isRelationship) return;

    // TODO --DTM-- set node ids on actual template after selection
    return( 
      <div className="related-templates-container">
        <span>{"To: "}</span>
        <Autocomplete
          getItemValue={(item) => item.label}
          items={this.props.nodeTemplates}
          renderItem={(item, isHighlighted) =>
            <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {Helpers.formatPropKey(item.label)}
            </div>
          }
          value={relatedTemplates.toQuery}
          onChange={(e) => this.setState({ 
            relatedTemplates: { 
              ...relatedTemplates,
              toQuery: e.target.value 
            }
          })}
          onSelect={(val, item) => this.setState((prevState, props) => { 
            return {
              template: {
                ...prevState.template,
                to_node_id: item
              },
              relatedTemplates: { 
                ...relatedTemplates,
                toQuery: Helpers.formatPropKey(val),
                toTemplate: item
              }
            }
          })}
          shouldItemRender={(item) => 
            String(Helpers.formatPropKey(item.label).toLowerCase())
                          .includes(relatedTemplates.toQuery.toLowerCase())
          }
        />
        <br/>
        <span>{"From: "}</span>
        <Autocomplete
          getItemValue={(item) => item.label}
          items={this.props.nodeTemplates}
          renderItem={(item, isHighlighted) =>
            <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {Helpers.formatPropKey(item.label)}
            </div>
          }
          value={relatedTemplates.fromQuery}
          onChange={(e) => this.setState({ 
            relatedTemplates: { 
              ...relatedTemplates,
              fromQuery: e.target.value 
            }
          })}
          onSelect={(val, item) => this.setState((prevState, props) => {  
            return {
              template: {
                ...prevState.template,
                from_node_id: item
              },
              relatedTemplates: { 
                ...relatedTemplates,
                fromQuery: Helpers.formatPropKey(val),
                fromTemplate: item
              }
            }
          })}
          shouldItemRender={(item) => 
            String(Helpers.formatPropKey(item.label).toLowerCase())
                          .includes(relatedTemplates.fromQuery.toLowerCase())
          }
        />  
      </div>
    );
  }

  renderTemplatePropsTable(template) {
    return(
      <div className="template-props-table-container">
        <Table striped bordered hover className="template-table">
          <thead>
            <tr className="template-table-header">
              <th colSpan={this.state.editing ? "4" : "3"}>
                {TemplateTypes.getTypeTitle(this.props.templateType)} Properties
              </th>
            </tr>
            <tr>
              <th>Key</th>
              <th>Value Type</th>
              <th>Show?</th>
              <th className={this.state.editing ? "" : "hidden"}></th>
            </tr>
          </thead>
          <tbody className="template-props">
            {this.renderTemplateProps(template.properties)}
          </tbody>
        </Table>
        <Button className={this.state.editing ? "template-add-prop-btn" : "hidden"}
          bsStyle="primary" bsSize="small" onClick={() => this.addPropToTemplate(template.properties)} >
          <Glyphicon glyph="plus" />
          Add Property
        </Button>
      </div>
    );
  }

  // Render template properties
  renderTemplateProps(props) {
    var propComps = [];
    console.log('props: ', props); // TODO --DM-- Remove
    
    // If props is empty, return
    if (!props) return;

    // If props is an array, render components
    if (Array.isArray(props)) {
      // Add nid prop for all templates
      propComps.push(
        <tr key={'id'} className="template-prop">
          <td>{"nid"}</td>
          <td>{"ID"}</td>
          <td>
            <Checkbox defaultChecked onChange={(e) => updateTemplateField(e, 'nid')} />
          </td>
          <td className={this.state.editing ? "" : "hidden"}></td>
        </tr>
      );
      
      // Push row for all other properties
      // Bind variables for updating template properties
      var updateTemplateField = this.updateTemplateField, 
          state = this.state, onPropChanged = this.onPropChanged;
      
      // Iterate through object keys
      props.forEach((prop, index) => {
        console.log("index: " + index);
        console.log("prop: " + prop);
        // Set variables for property and property id
        let new_prop = (prop.hasOwnProperty('new_prop') && prop.new_prop === true);
        let disabled = (prop.hasOwnProperty('disabled')) ? prop.disabled : true;

        // Push components for each property
        propComps.push(
          <tr key={'div-'+index} className="template-prop">
            <td>
              <EditableInput key={index+'1'} index={index} propKey='key' value={prop['key']}
                  disabled={false} editing={state.editing} inputType={InputTypes.TEXT} 
                  onChange={(index, key, value) => onPropChanged(index, key, value)} />
            </td>
            <td>
              <EditableInput key={index+'2'} index={index} propKey='value_type' value={prop['value_type']} 
                  disabled={disabled} editing={state.editing} inputType={InputTypes.SELECT} 
                  onChange={(index, key, value) => onPropChanged(index, key, value)} /></td>
            <td>
              <Checkbox key={index+'3'} defaultChecked onChange={(e) => updateTemplateField(e, prop.key)} />
            </td>
            <td className={this.state.editing ? "template-remove-prop-td" : "hidden"}>
              <Button key={index+'4'} className="template-remove-prop-btn"
                      bsStyle="danger" bsSize="small" aria-label="Left Align"
                      onClick={() => this.removePropFromTemplate(prop, index, !new_prop)}>
                <Glyphicon glyph="remove" />
              </Button>
            </td>
          </tr>
        );
      });
      return propComps;
    }
    return;
  }

  renderRelPropsTable(template) {
    // If template is a relationship template, don't render relationships
    if (this.props.isRelationship) return;

    // If template is a relationship template, render relationships
    return (
      <div className="relationship-props-table-container">
        <Table striped bordered hover className="template-table">
          <thead>
            <tr className="template-table-header">
            <th colSpan={this.state.editing ? "3" : "2"}>
              {TemplateTypes.getTypeTitle(this.props.templateType)} Relationships
            </th>
            </tr>
            <tr>
              <th>Key</th>
              <th>Value Type</th>
              <th className={this.state.editing ? "" : "hidden"}></th>
            </tr>
          </thead>
          <tbody className="template-rels">
            {this.renderTemplateRels(template.in_relationships, true)}
            {this.renderTemplateRels(template.out_relationships, false)}
          </tbody>
        </Table>
      </div>
    );
  }

  // Render template properties
  renderTemplateRels(rels, isIn) {
    // console.log('rels: ', rels); // TODO --DM-- Remove
    var relComps = [];

    // Bind variables for updating template field
    var state = this.state, 
        addPropToRel = this.addPropToRel, 
        onRelPropChanged = this.onRelPropChanged,
        removePropFromRel = this.removePropFromRel;
    
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
      rels.forEach(function(rel, relIndex) {
        // console.log('rel: ', rel); // TODO --DM-- Remove
        // Combine all template props
        let propComps = [];
        
        // If props is an array and has at least one key, render components
        if (rel.properties.length >= 1 && Object.prototype.toString.call( rel.properties ) === '[object Array]' ) {
          // Push row for all properties
          rel.properties.forEach(function(prop, propIndex) {
            // Set variables for property and property id
            let new_prop = (prop.hasOwnProperty('new_prop') && prop.new_prop === true);
            let disabled = (prop.hasOwnProperty('disabled')) ? prop.disabled : true;

            propComps.push(
              <tr key={'div-'+prop['id']} className="template-prop">
                <td>
                  <EditableInput index={propIndex} propKey='key' value={prop['key']}
                      disabled={false} editing={state.editing} inputType={InputTypes.TEXT} 
                      onChange={(propIndex, key, value) => onRelPropChanged(isIn, relIndex, propIndex, key, value)} />
                </td>
                <td>
                  <EditableInput index={propIndex} propKey='value_type' value={prop['value_type']} 
                      disabled={disabled} editing={state.editing} inputType={InputTypes.SELECT} 
                      onChange={(propIndex, key, value) => onRelPropChanged(isIn, relIndex, propIndex, key, value)} />
                </td>
                <td className={state.editing ? "rel-remove-prop-td" : "hidden"}>
                  <Button className="rel-remove-prop-btn"
                          bsStyle="danger" bsSize="small" aria-label="Left Align"
                          onClick={() => removePropFromRel(isIn, relIndex, prop, propIndex, !new_prop)}>
                    <Glyphicon glyph="remove" />
                  </Button>
                </td>
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
              <Button className={state.editing ? "rel-add-prop-btn" : "hidden"}
                      bsStyle="primary" bsSize="small" onClick={() => addPropToRel(isIn, relIndex, rel.properties)} >
                <Glyphicon glyph="plus" />
                Add Property
              </Button>
            </th>
            <th className={state.editing ? "" : "hidden"}></th>
          </tr>
        );
        relComps.push(propComps);
      });
      return relComps;
    }
    return;
  }

  renderRemovePropModal() {
    // If propToRemove doesn't exist, return
    if (_.isEmpty(this.state.propToRemove)) return;

    // Check if propToRemove is relationship property or template property
    if (this.state.propToRemove.index.relIndex === -1) {
      return(
        <Modal show={this.state.showRemovePropModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Template Property?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this template property? This will
            permanently delete all data associated with this property from all nodes.
            This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeRemovePropModal}>Close</Button>
            <Button className="template-remove-prop-btn" bsStyle="danger"
                onClick={() => this.removePropFromTemplate(
                    this.state.propToRemove, 
                    this.state.propToRemove.index.propIndex,
                    false)}>
                Delete Property
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return(
        <Modal show={this.state.showRemovePropModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Relationship Property?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this relationship property? This will
            permanently delete all data associated with this property from all nodes.
            This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeRemovePropModal}>Close</Button>
            <Button className="rel-remove-prop-btn" bsStyle="danger"
                onClick={() => this.removePropFromRel(
                    this.state.propToRemove.index.isIn, 
                    this.state.propToRemove.index.relIndex, 
                    this.state.propToRemove, 
                    this.state.propToRemove.index.propIndex,
                    false)}>
                Delete Property
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  render() {  
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // Initialize labelEditableInput based on template type
    let labelEditableInput;
    if (this.props.isRelationship) {
      labelEditableInput = 
        <EditableInput index={this.state.template.id} propKey='rel_type'
          value={this.state.template.rel_type}
          disabled={false} editing={this.state.editing} inputType={InputTypes.TEXT} 
          onChange={(index, key, value) => this.onRelTypeChanged(value)} />
    } else {
      labelEditableInput = 
        <EditableInput index={this.state.template.id} propKey='label'
          value={Helpers.formatPropKey(this.state.template.label)}
          disabled={false} editing={this.state.editing} inputType={InputTypes.TEXT} 
          onChange={(index, key, value) => this.onLabelChanged(value)} />
    }

    return (
      <div className={(this.props.open) ? "list-group-item template-item active" : "list-group-item template-item" }>
        <div className="template-label-wrapper" onClick={() => this.changeTemplate(this.props.template)}>
          <span className="template-label" >
            {labelEditableInput}
          </span>
          <Button className={(this.props.open) ? "template-edit-btn" : "hidden" } onClick={() => this.updateEditing()}>
            <Glyphicon glyph="pencil" />
          </Button>
        </div>
        <Collapse in={this.props.open}>
          <div className="template-container">
            {/* TODO --DTM-- Remove */}
            {/* <show={this.props.nodeTemplate.isFetching} /> */} 
            {this.renderTemplate()}
            <div>
              {this.renderRemovePropModal()}
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}



export default NodeTemplate;