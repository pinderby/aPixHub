import React, { Component } from 'react';
import _ from 'lodash';
import Helpers from '../helpers.js';
import NodeProfileImage from './NodeProfileImage.js'

class InfoBox extends Component {  
  render() {
    return (
      <div id="info-box-container" className="panel panel-default">
        <div id="info-box" className="panel-body">
          <NodeProfileImage profile_image={this.props.node.profile_image} />
          {Helpers.renderProps(this.props.node.info_box.properties)}
        </div>
      </div>
    );
  }
}




export default InfoBox;