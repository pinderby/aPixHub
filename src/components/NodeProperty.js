import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helpers from '../helpers.js';
import { updateRelationshipTemplate } from '../actions/templates';
/* eslint jsx-a11y/img-redundant-alt: 0 */

class NodeProperty extends Component {  
  setRelationshipTemplate(relTemp) {
    // Update relationship template in redux store
    this.props.dispatch(updateRelationshipTemplate(
      Object.assign({}, {
        isFetching: false,
        didInvalidate: false,
        template: relTemp,
      })
    ));
  }

  render() {
    // If cover_img or profile_img, display img
    let value = <span className="node-prop-value"> {Helpers.renderProps(this.props.value)}</span>;
    if (this.props.propKey === 'profile_image') {
      value = <div className="profile-img"><img src={this.props.value} alt="Profile Image" className="img-rounded node-img" /></div>
    } else if (this.props.propKey === 'cover_image') {
      value = <div className="cover-img"><img src={this.props.value} alt="Cover Image" className="img-rounded node-img" /></div>
    } else if (this.props.propKey === 'rel_type' && this.props.relTemp) {
      let relTemp = this.props.relationshipTemplate;
      value = <Link key={relTemp['id']} to={`/r/${relTemp.id}` } 
                    onClick={() => this.setRelationshipTemplate(relTemp)} >
                {Helpers.renderProps(this.props.value)}
              </Link>;
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