import React, { Component } from 'react';
import moment from 'moment';
import Helpers from '../helpers.js';

class ReviewsSection extends Component {
  renderReviews(reviews) {
    var reviewComponents = [];
    reviews.forEach(function(review) {
      reviewComponents.push(<Review key={review.author} review={review} />);
    });
    return reviewComponents;
  }
  
  render() {
    return (
      <div id="reviews-section-container" className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title">User Reviews</h2>
        </div>
        <div id="reviews-section" className="panel-body">
          {this.renderReviews(this.props.reviews)}
        </div>
      </div>
    );
  }
}

class Review extends Component {
  render() {
    return (
      <div className="review-container panel panel-default">
        <div className="review panel-body">
          <StarRating rating={this.props.review.rating} />
          <ReviewBody body={this.props.review.body} />
          <ReviewFooter review={this.props.review} />
        </div>
      </div>
    );
  }
}

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

class ReviewBody extends Component {
  render() {
    return (
      <div className="review-body">
        {this.props.body}
      </div>
    );
  }
}

class ReviewFooter extends Component {
  render() {
    return (
      <div className="review-footer">
        <img src={this.props.review.profile_pic} alt="Profile Picture" className="review-profile-pic" />
        <div className="review-author">{this.props.review.author}</div>
        <div className="review-title">{this.props.review.title}</div>
        <div className="review-company">{this.props.review.company}</div>
        <div className="review-published-at">{this.props.review.published_at}</div>
      </div>
    );
  }
}

export default ReviewsSection;