import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';

class ImagesSection extends Component {
  renderImages(images) {
    var imageComponents = [];
    images.forEach(function(image) {
      imageComponents.push(<Image key={image.url} url={image.url} />);
    });
    return imageComponents;
  }
  
  render() {
    return (
      <div id="images-section-container">
        <h4>Photos</h4>
        <div id="images-section">
          {this.renderImages(this.props.images)}
        </div>
      </div>
    );
  }
}

class Image extends Component {
  render() {
    return (
      <div className="image-container">
        <div className="image">
          <img src={this.props.url} alt="Image" className="img-rounded"/>
        </div>
      </div>
    );
  }
}



export default ImagesSection;