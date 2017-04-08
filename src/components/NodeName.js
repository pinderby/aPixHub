import React, { Component } from 'react';

class NodeName extends Component {
  render() {
    return (
      <div id="node-name-container">
        <div id="node-name">
          <h1>{this.props.name}</h1>
        </div>
      </div>
    );
  }
}




export default NodeName;