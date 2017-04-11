import React, { Component } from 'react';
import _ from 'lodash';
import { AddPropertyButton } from './ApixNodeBuilder.js';
import Helpers from '../helpers.js';
import PropertyTypes from '../constants/propertyTypes.js';
import NodeObjectBuilder from './NodeObjectBuilder.js';

class PropertyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propType: props.prop.type,
    };

    this.renderInput = this.renderInput.bind(this);
  }
  
  renderInput(props, disabled) {
    var prop = props.prop;
    const x = this;
    if(prop.type === 'object') {
      var comps = [];
      comps.push(<input key={prop.label} type={prop.type} className="form-control" 
          id={prop.label} value={prop.label} placeholder={prop.placeholder} disabled={disabled}
          onChange={(e) => x.textChanged(e, prop, this.props.onChange)}
            />);
      // comps.push(<AddPropertyButton disabled={false} onClick={this.props.addProperty}/>);
      /*comps.push(<button key={prop.label+'1'} type="button" className="btn btn-info" disabled={this.props.disabled} onClick={this.props.addProperty}>
        <span key={prop.label+'2'} className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        Property
      </button>);*/
      return comps;
    }

    if (prop.label) {
      return <input type={prop.type} className="form-control" 
          id={prop.label} value={prop.label} placeholder={prop.placeholder} disabled={disabled}
          onChange={(e) => x.textChanged(e, prop, this.props.onChange)} />;
    } else {
      return <input type={prop.type} className="form-control" 
          id={prop.label} placeholder={prop.placeholder} disabled={disabled}
          onChange={(e) => x.textChanged(e, prop, this.props.onChange)} />;
    }
    
  }

  textChanged(e, prop, onChange) {
    // Copy old path
    var oldPath = prop.path.slice();

    // Set prop label to user-entered value
    prop.label = e.target.value;
    console.log('Label: ', prop.label); // TODO --DM-- Remove

    // Create parse new path for property
    prop.path = Helpers.parseNewPath(prop.path, prop.label);

    // Set default prop.type if not defined
    if(!prop.type) prop.type = 'string';

    console.log('textChanged(): ', oldPath, prop.path, prop); // TODO --DM-- Remove

    // Call callback
    onChange('label', oldPath, prop.path, prop);
  }

  typeChanged(value, prop, onChange) {
    // Assign new type to property
    prop.type = value;
    
    // Call callback to update property
    onChange('type', null, prop.path, prop);
  }
  
  render() {
    // Check if property is disabled (mandatory)
    var partial, disabled = this.props.prop.disabled ? 'disabled' : "";

    // If property is not disabled, show the 'remove property' button
    if (!disabled) {
      partial = <button type="button" className="btn btn-danger btn-remove-property" 
                    aria-label="Left Align" onClick={() => this.props.onClick(this.props.prop.path)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>;
    }

    var objectBuilder;
    if (this.state.propType === 'object') {
      objectBuilder = <NodeObjectBuilder node={this.props.node} 
                        path={this.props.prop.path} dispatch={this.props.dispatch} />;
    }

    return (
      <div id="property-input-container">
        <div id="property-input">
          <div className="form-group">
            {partial}
            <label htmlFor={this.props.prop.label}>{this.props.prop.display_label}</label>
            {this.renderInput(this.props, disabled)}
            <PropertyTypeSelect disabled={disabled} prop={this.props.prop}
                onChange={(e) => this.typeChanged(e, this.props.prop, this.props.onChange)} />
            <br />
            {objectBuilder}
          </div>
        </div>
      </div>
      
    );
  }
}

class PropertyTypeSelect extends Component {
  constructor(props) {
    super(props);

    // Create typesMap for property categories
    this.typesMap = {
      'Text or Link':'string',
      'Number':'integer',
      'Decimal':'float',
      'True/False':'boolean',
      'Link to another thing':'relationship', // TODO --DM-- Rename
      'List':'array',
      'Object':'object' // TODO --DM-- Rename
    };

    // Bind methods
    this.handleChange = this.handleChange.bind(this);
    this.renderOptions = this.renderOptions.bind(this);

    // Set initial value for property type
    this.state = {
      value: Helpers.getKey(this.typesMap, props.prop.type),
    }
  }
  
  handleChange(event) {
    // Get type string from event
    var value = this.typesMap[event.target.value];

    // Update type in ApixNodeBuilder
    this.props.onChange(value);

    // Update type in state to sync with ApixNodeBuilder
    this.setState({
      value: Helpers.getKey(this.typesMap, value),
    });
  }

  renderOptions(prop) {
    // Initialize options array
    var options = [];

    // Iterate through typesMap for options, push each option
    Object.keys(this.typesMap).forEach(function(type, index, array) {
      options.push(<option key={index}>{type}</option>);
    });

    return options;
  }
  
  render() {
    return (
      <select className="form-control" 
              value={this.state.value} 
              onChange={this.handleChange} 
              disabled={this.props.disabled}>
        {this.renderOptions(this.props.prop)}
      </select>
    );
  }
}

export default PropertyInput;