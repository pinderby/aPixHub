import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';

class NodeProfileImage extends Component {
  render() {
    return (
      <div id="node-profile-image-container">
        <div id="node-profile-image">
          <img src={this.props.profile_image.url} alt="Profile Image"/>
        </div>
      </div>
    );
  }
}




export default NodeProfileImage;