import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';

class VideosSection extends Component {
  renderVideos(videos) {
    var videoComponents = [];
    videos.forEach(function(video) {
      if (/youtu/.test(video.url)) {
        videoComponents.push(<YoutubeVideo key={video.url} url={video.url} thumbnail={video.thumbnail} />);
      } else {
        videoComponents.push(<Video key={video.url} url={video.url} thumbnail={video.thumbnail} />);
      }
    });
    return videoComponents;
  }
  
  render() {
    return (
      <div id="videos-section-container">
        <h4>Videos</h4>
        <div id="videos-section">
          {this.renderVideos(this.props.videos)}
        </div>
      </div>
    );
  }
}

class Video extends Component {
  render() {
    return (
      <div className="video-container">
        <div className="video">
          <video width="400" height="256" preload="auto" controls>
            <source src={this.props.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }
}

class YoutubeVideo extends Component {
  render() {
    return (
      <div className="video-container">
        <div className="video">
          <iframe width="400" height="256" src={this.props.url} frameBorder="0" allowFullScreen>
          </iframe>
        </div>
      </div>
    );
  }
}

export default VideosSection;