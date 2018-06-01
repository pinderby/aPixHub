import React, { Component } from 'react';
import Helpers from '../../helpers.js';
import { Link } from 'react-router-dom';
import { Table, Collapse } from 'react-bootstrap';
// import './NodeTemplate.css'
import './TemplateSearch.css';
import LoadingOverlay from '../LoadingOverlay';
import { fetchTemplate, fetchDeleteTemplate } from '../../actions/templates';

class NodeTemplate extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.renderTemplateProps = this.renderTemplateProps.bind(this);
    this.renderTemplateRels = this.renderTemplateRels.bind(this);

    // TODO --DTM-- Remove?
    // // If nodeTemplate doesn't exist, query it from server
    // if (!props.nodeTemplate.template) {
    //   this.getTemplate(props.match.params.label);
    //   this.state = {
    //     nodeTemplate: { isFetching: true },
    //   };
    //   return;
    // }
  }

  getTemplate(templateLabel) {
    // Dispatch fetchTemplate to get template by label
    this.props.dispatch(fetchTemplate(templateLabel));
  }

  deleteTemplate(templateId) {
    // Dispatch fetchDeleteTemplate to delete template by id
    this.props.dispatch(fetchDeleteTemplate(templateId));
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
        <tr className="template-prop">
          <td>{"nid"}</td>
          <td>{"ID"}</td>
        </tr>
      );
      
      // Push row for all other properties
      props.forEach(function(prop) {
        propComps.push(
          <tr key={'div-'+prop['id']} className="template-prop">
            <td>{prop['key']}</td>
            <td>{prop['value_type']}</td>
          </tr>
        );              
      });
      return propComps;
    }
    return;
  }

    // Render template properties
    renderTemplateRels(rels, isIn) {
      console.log('rels: ', rels); // TODO --DM-- Remove
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
          console.log('rel: ', rel); // TODO --DM-- Remove
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
              <th colspan="2">
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
    // If template exists, generate template panel
    let templatePanel = "";
    if (this.props.template) {
      // Initialize template and display label
      let template = this.props.template, 
      displayLabel = Helpers.capitalizeFirstLetter(template['label']);

      templatePanel =
        <div className="apix-template">
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
                    <th colspan="2">Template Properties</th>
                  </tr>
                  <tr>
                    <th>Key</th>
                    <th>Value Type</th>
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
                    <th colspan="2">Template Relationships</th>
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
            </div>
          </div>
        </div>
      
      console.log('Template:', template);
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