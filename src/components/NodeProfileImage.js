import React, { Component } from 'react';
/* eslint jsx-a11y/img-redundant-alt: 0 */

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