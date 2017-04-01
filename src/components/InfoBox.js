import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import Helpers from '../helpers.js';
import NodeProfileImage from './NodeProfileImage.js'
import NodeProperty from './NodeProperty.js'

class InfoBox extends Component {
  renderProps(object) {
    var props = [];
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
  
  render() {
    return (
      <div id="info-box-container" className="panel panel-default">
        <div id="info-box" className="panel-body">
          <NodeProfileImage profile_image={this.props.node.profile_image} />
          {this.renderProps(this.props.node.info_box.properties)}
        </div>
      </div>
    );
  }
}




export default InfoBox;