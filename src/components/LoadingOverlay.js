import React, { Component } from 'react';

class LoadingOverlay extends Component {
  // Generate classes for overlay
  getOverlayClasses(show) {
    let overlayClasses = "shadow-overlay";

    // If not showing, add hide class
    if (!show) overlayClasses += " hide";

    return overlayClasses;
  }
  
  render() {
    return (
      <div className={this.getOverlayClasses(this.props.show)}>
        <img className="loading-spinner" alt={"Loading Spinner"} src={require("../assets/loading_spinner.svg")} />
      </div>
    )
  }
}

export default LoadingOverlay;