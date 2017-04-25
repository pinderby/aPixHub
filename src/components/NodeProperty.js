import React, { Component } from 'react';
import Helpers from '../helpers.js';

class NodeProperty extends Component {  
  render() {


    // If cover_img or profile_img, display img
    let value = <span className="node-prop-value"> {Helpers.renderProps(this.props.value)}</span>;
    if (this.props.propKey === 'profile_image') {
      value = <div className="profile-img"><img src={this.props.value} alt="Profile Image" className="img-rounded node-img" /></div>
    } else if (this.props.propKey === 'cover_image') {
      value = <div className="cover-img"><img src={this.props.value} alt="Cover Image" className="img-rounded node-img" /></div>
    }

    return (
      <div className="node-property-container">
        <div className="node-property">
          <span className="node-prop-key">{Helpers.formatPropKey(this.props.propKey)}</span>:{" "}
          {value}
        </div>
      </div>
    );
  }
}



export default NodeProperty;