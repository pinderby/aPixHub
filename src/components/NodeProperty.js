import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';

class NodeProperty extends Component {
  formatKeyString(string) {
      string = string.toLowerCase().split('_');
      for (var i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
      }
      
      return string.join(' ');
    }
  
  renderValue(object) {
    console.log(object);
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
      var props = [];
      console.log(object);
      for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
          switch(typeof(object[prop])) {
            case "string":
                props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="string" />);
                break;
            case "number":
                props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="number" />);
                break;
            case "object":
                if (Object.prototype.toString.call( object[prop] ) === '[object Array]' ) {
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop].join(', ')} type="array" />);
                } else {
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop].toString()} type="object" />);
                }
                break;
            default:
                return;
          }
        }
      }
      return props;
    } else {
      return object;
    }
  }
  
  render() {
    return (
      <div className="node-property-container">
        <div className="node-property">
          <span className="node-prop-key">{this.formatKeyString(this.props.propKey)}</span>: 
          <span className="node-prop-value"> {this.renderValue(this.props.value)}</span>
        </div>
      </div>
    );
  }
}



export default NodeProperty;