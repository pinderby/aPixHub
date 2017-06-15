import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PropertyInput extends Component {
  constructor(props) {
    super(props);

    // Initialize value
    let value = '', value_type = 'string';
    if (props.value) value = props.value;
    if (props.value_type) value_type = props.value_type;

    // Bind callbacks
    this.textChanged = this.textChanged.bind(this);

    this.state = {
      key: props.propKey,
      value: value,
      value_type: value_type,
    };
  }

  textChanged(e, onChange) {
    // Update state with new value
    this.setState({
      value: e.target.value
    });

    // Call callback
    onChange(null, null, this.state.key, e.target.value);
  }

  renderInput(prop) {
    console.log('renderInput(prop): ', prop);
    if(this.state.value_type === 'node') {
      // TODO --DM-- Implement getting nodes from server
      // Use react-autocomplete: https://github.com/reactjs/react-autocomplete
      return(<input key={this.state.key} type={this.state.value_type} className="form-control" 
          id={this.state.key} value={prop.value} placeholder={`Enter ${this.props.label} here`}
          onChange={(e) => this.textChanged(e, this.props.onChange)}
            />);
    } else {
      return(
        <input className="form-control" type={'text'}
            id={this.state.key} value={this.state.value} placeholder={`Enter ${this.props.label} here`}
            onChange={(e) => this.textChanged(e, this.props.onChange)} />
      );
    }
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove
    return (
      <div>
        <label htmlFor={this.state.key}>{this.props.label}</label>
        {this.renderInput(this.props.prop)}
      </div>
    );
  }
}

PropertyInput.propTypes = {
  label: PropTypes.string.isRequired,
  propKey: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  prop: PropTypes.node,
  value_type: PropTypes.string
};

export default PropertyInput;