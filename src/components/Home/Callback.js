// src/Callback/Callback.js

import React, { Component } from 'react';
import LoadingOverlay from '../LoadingOverlay';

class Callback extends Component {
  render() {

    return (
      <div className="callback-container">
        <LoadingOverlay show={true} alt="loading" />
      </div>
    );
  }
}

export default Callback;