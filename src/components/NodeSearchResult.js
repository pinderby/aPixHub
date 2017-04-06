import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';
import StarRating from './StarRating.js';

class NodeSearchResult extends Component {
  renderImages(images) {
    var imageComponents = [];
    images.forEach(function(image) {
      imageComponents.push(<Image key={image.url} url={image.url} />);
    });
    return imageComponents;
  }
  
  render() {
    var node = this.props.node;
    var user_rating = node.info_box.properties.user_rating;
    var rating = eval(user_rating.user_rating)/10

    return (
      <div id="node-search-result-container" className="panel panel-default">
        <div className="result-header">
          <h2 className="result-title">{this.props.node.name} ({"R"})</h2>
          <div className="rating-container">
            <StarRating rating={rating} />
            <p className="result-rating">{user_rating.user_rating}/10 with 
                &nbsp;{Helpers.numberWithCommas(user_rating.user_rating_count)} ratings</p>
          </div>
        </div>
        <div id="media-section" className="panel-body">
          <Image key={node.profile_image.url} url={node.profile_image.url} />
          <div className="result-content">
            <p className="result-stars">Starring {node.info_box.properties.stars.join(', ')}</p>
            <p className="result-director">Directed by {node.info_box.properties.director}</p>
            <p className="result-director">Release Date  {"March 3rd, 2017"}</p>
          </div>
          <div className="actor-roll">
              <div id="images-section">
                {this.renderImages(node.media.images.slice(0,3))}
              </div>
          </div>
        </div>
        
      </div>
    );
  }
}

class Image extends Component {
  render() {
    return (
      <div className="image-container">
        <div className="image-result">
          <img src={this.props.url} alt="Image" className="img-rounded"/>
        </div>
      </div>
    );
  }
}

export default NodeSearchResult;