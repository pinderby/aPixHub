import React, { Component } from 'react';
import _ from 'lodash';
import { AddPropertyButton } from './ApixNodeBuilder.js';
import Helpers from '../helpers.js';

class PropertyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
      comps.push(<AddPropertyButton disabled={false} onClick={this.props.addProperty}/>);
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
    console.log(prop.label);

    // Create parse new path for property
    prop.path = Helpers.parseNewPath(prop.path, prop.label);

    // Set default prop.type if not defined
    if(!prop.type) {
      prop.type = 'string';
    }

    console.log('textChanged(): ', oldPath, prop.path, prop); // TODO --DM-- Remove

    // Call callback
    onChange(oldPath, prop.path, prop);
  }

  typeChanged(value, oldProp, onChange) {
    var prop = Object.assign({}, oldProp);
    var index = this.props.index;
    prop.type = value;
    onChange(prop, index);
  }
  
  render() {
    var disabled = this.props.prop.disabled ? 'disabled' : "";
    var partial = "";
    if (!disabled) {
      partial = <button type="button" className="btn btn-danger btn-remove-property" 
                    aria-label="Left Align" onClick={() => this.props.onClick(this.props.prop.path)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>;
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
          </div>
        </div>
      </div>
      
    );
  }
}

class PropertyTypeSelect extends Component {
  constructor(props) {
    super(props);
    this.typesArray = ['Text or Link',
                       'Number',
                       'Decimal',
                       'True/False',
                       'Link to another thing', // TODO --DM-- Rename
                       'List',
                       'Object']; // TODO --DM-- Rename
    this.typesMap = {
      'Text or Link':'string',
      'Number':'integer',
      'Decimal':'float',
      'True/False':'boolean',
      'Link to another thing':'relationship',
      'List':'array',
      'Object':'object'
    };
    if (props.prop.type) {
      this.state = {
        value: _.findKey(this.typesMap, this.props.prop.type),
      };
    } else {
      this.state = {
        value: this.typesArray[0],
      };
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    var value = this.typesMap[event.target.value];
    this.props.onChange(value);
  }

  renderOptions(prop) {
    var options = [];
    var typesMap = this.typesMap;
    this.typesArray.forEach(function(type, index, array) {
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