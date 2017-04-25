import React, { Component } from 'react';
/* eslint no-eval: 0 */


class StarRating extends Component {
  render() {
    return (
      <div className="star-ratings-css">
        <div className="star-ratings-css-top" style={{width: (eval(this.props.rating)*100)+'%'}}>
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div className="star-ratings-css-bottom">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
    );
  }
}

export default StarRating;