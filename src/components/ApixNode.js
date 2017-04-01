import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';
import './ApixNode.css'
import NodeName from './NodeName.js';
import NodeProfileImage from './NodeProfileImage.js';
import NodeCoverImage from './NodeCoverImage.js';
import NodeProperty from './NodeProperty.js';
import InfoBox from './InfoBox.js';
import Section from './Section.js';
import MediaSection from './MediaSection.js';
import VideosSection from './VideosSection.js';
import ImagesSection from './ImagesSection.js';
import ReviewsSection from './ReviewsSection.js';
import TagsSection from './TagsSection.js';
import logan from '../logan.json';

class ApixNode extends Component {
  render() {
    var node = logan;

    return (
      <div id="apix-node-container">
        <div id="apix-node">
          <NodeName name={node.name} />
          <InfoBox node={node} />
        </div>
      </div>
    );
  }
}




export default ApixNode;