import React, { Component } from 'react';
import _ from 'lodash';
import Helpers from '../../helpers.js';
// import NodeObjectPopulator from './NodeObjectPopulator.js';
/* eslint no-eval: 0 */

class PropertyBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propType: props.prop.type,
    };

    // Bind methods
    this.renderInput = this.renderInput.bind(this);
  }
  
  renderInput(props) {
    // Initialize property
    let prop = props.prop;
    let node = props.node;
    let value = Helpers.getObjProp(node, prop.path);
    if (value) value = value.value;

    // console.log('node, prop: ', node, prop);
    console.log('value: ', value);

    // If array, then give a textarea for input
    if (prop.value_type[0] === '[') {
      return <textarea type={prop.value_type} className="form-control" 
          id={prop.key} value={value} placeholder="Input list here, comma-separated"
          onChange={(e) => this.textChanged(e, prop, this.props.onChange)} />;
    } else if (prop.value_type === 'object') {
      // TODO --DM-- Handle object input
    } else {
      return <input type={prop.value_type} className="form-control" 
          id={prop.key} value={value}
          onChange={(e) => this.textChanged(e, prop, this.props.onChange)} />;
    }
  }

  textChanged(e, prop, onChange) {
    // If array, then give a textarea for input
    if (prop.value_type[0] === '[') {
      // Set prop array to user-entered values
      prop.value = e.target.value.split(',');
    } else if (prop.value_type === 'object') {
      // TODO --DM-- Handle object input
    } else {
      // Set prop value to user-entered value
      prop.value = e.target.value;
    }

    console.log('Value: ', prop.value); // TODO --DM-- Remove
    console.log('textChanged(): ', prop.path, prop); // TODO --DM-- Remove

    // Call callback
    onChange(prop.path, prop);
  }
  
  render() {
    var objectPopulator;
    if (this.state.propType === 'object') {
      /*objectPopulator = <NodeObjectPopulator nodeTemplate={this.props.nodeTemplate} 
                        node={this.props.node} path={this.props.prop.path} 
                        dispatch={this.props.dispatch} />;*/ // TODO --DM-- Implement
    }
    console.log("prop: ", this.props.prop);
    this.props.prop.display_label = Helpers.formatPropKey(this.props.prop.key);

    return (
      <div className="property-populator-container">
        <div className="property-populator">
          <div className="form-group">
            <label htmlFor={this.props.prop.label}>{this.props.prop.display_label}</label>
            {this.renderInput(this.props)}
            <br />
            {objectPopulator}
          </div>
        </div>
      </div>
      
    );
  }
}

export default PropertyBuilder;