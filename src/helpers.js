import React, { Component } from 'react';
import NodeProperty from './components/NodeProperty.js'

class Helpers {
  static numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  static renderProps(object) {
    var props = [];
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
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
                  props.push(<NodeProperty key={prop} propKey={prop} value={object[prop]} type="object" />);
                }
                break;
            default:
                return;
          }
        }
      }
      return props;
    }
    return object;
  }

  static formatPropKey(string) {
    string = string.toLowerCase().split('_');
    for (var i = 0; i < string.length; i++) {
      string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1); 
    }
    
    return string.join(' ');
  }
}

export default Helpers;