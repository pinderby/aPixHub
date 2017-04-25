import React, { Component } from 'react';
import Helpers from '../helpers.js';

class Section extends Component {
  render() {
    return (
      <div className="section-container panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title">{this.props.section.title}</h2>
        </div>
        <div className="section panel-body">
          {this.props.section.content_body}
          {Helpers.renderProps(this.props.section.properties)}
          {Helpers.renderSections(this.props.section.sections)}
        </div>
      </div>
    );
  }
}

export default Section;