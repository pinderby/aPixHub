import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';

class NodeProperty extends Component {  
  render() {
    return (
      <div className="node-property-container">
        <div className="node-property">
          <span className="node-prop-key">{Helpers.formatPropKey(this.props.propKey)}</span>: 
          <span className="node-prop-value"> {Helpers.renderProps(this.props.value)}</span>
        </div>
      </div>
    );
  }
}



export default NodeProperty;