import React, { Component } from 'react';
import VideosSection from './VideosSection.js';
import ImagesSection from './ImagesSection.js';

class MediaSection extends Component {
  render() {
    return (
      <div id="media-section-container" className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title">Media</h2>
        </div>
        <div id="media-section" className="panel-body">
          <ImagesSection images={this.props.node.media.images} />
          <VideosSection videos={this.props.node.media.videos} />
        </div>
      </div>
    );
  }
}



export default MediaSection;