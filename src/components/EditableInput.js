import React, { Component } from 'react';
import Helpers from '../helpers.js';
import PropertyTypes, { InputTypes } from '../constants/PropertyTypes';
import PropTypes from 'prop-types';

class EditableInput extends Component {
  constructor(props) {
    super(props);
    // Expecting Props: propKey, value, editing, inputType, disabled, onChange

    // Initialize value
    let value = '';
    if (props.value) value = props.value;

    // Bind callbacks
    this.valueChanged = this.valueChanged.bind(this);
    this.renderInput = this.renderInput.bind(this);

    this.state = {
      value: value
    };
  }

  valueChanged(e, onChange) {
    // Update state with new value
    this.setState({
      value: e.target.value
    });

    // Call callback
    onChange(this.state.key, e.target.value);
  }

  renderInput() {
    switch(this.props.inputType) {
      case InputTypes.TEXT: // Return a text input with value prefilled
          return(
            <input className="form-control" type={'text'} disabled={this.props.disabled}
                id={this.props.propKey} value={this.state.value} 
                placeholder={`Enter ${Helpers.formatPropKey(this.props.key)} here`}
                onChange={(e) => this.valueChanged(e, this.props.onChange)} />
          );
      case InputTypes.SELECT: // Return a select with property types as options
          return(
            <select className="form-control" disabled={this.props.disabled}
                id={this.props.propKey} value={this.state.value}
                onChange={(e) => this.valueChanged(e, this.props.onChange)} >
                {this.renderOptions(this.state.value)}
            </select>
          );
      default: // Default to text
          console.log('this.props.inputType defaulted to text: ', this.props.inputType); // TODO --DM-- Remove
          return(
            <input className="form-control" type={'text'}
                id={this.props.propKey} value={this.state.value} 
                placeholder={`Enter ${Helpers.formatPropKey(this.props.key)} here`}
                onChange={(e) => this.valueChanged(e, this.props.onChange)} />
          );
    }
  }

  renderOptions(value) {
    // Initialize options array
    var types = Object.assign({}, PropertyTypes);
    var options = [];

    // TODO --DTM-- Are we still doing array types?
    // // If select is for array type, remove node, array, and object options
    // if (isArray) {
    //   delete types[Helpers.getKey(PropertyTypes, 'object')];
    //   delete types[Helpers.getKey(PropertyTypes, 'array')];
    //   delete types[Helpers.getKey(PropertyTypes, 'relationship')];

    //   // Add explainer option
    //   types = Object.keys(types);
    //   types.splice(0, 0, 'Select a list type');
    // } else {
    //   types = Object.keys(types);
    // }

    // Iterate through typesMap for options, push each option
    for (var type in types) {
      options.push(<option key={type} value={type}>{type}</option>);
    };

    return options;
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove
    let body = '';
    if (this.props.editing) {
      // If editing, render input and selet fields
      body = this.renderInput();
    } else {
      // If not editing, just show values
      body = <span>{this.props.value}</span>
    }
    return (
      <div>
        {body}
      </div>
    );
  }
}

EditableInput.propTypes = {
  propKey: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  inputType: PropTypes.number.isRequired,
  disabled: PropTypes.bool
};

export default EditableInput;