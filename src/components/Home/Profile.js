// src/Profile/Profile.js

import React, { Component } from 'react';
import { Button, Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import Auth from '../../services/Auth.js';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
        
    // Instantiate Auth object
    const auth = new Auth();

    // Bind methods
    this.updateMetadata = this.updateMetadata.bind(this);

    this.state = {
      auth: auth,
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  updateMetadata() {
    this.state.auth.updateMetadata({ test: 'test' });
  }

  render() {
    console.log("state", this.state); // TODO --DTM-- Remove

    const { profile } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            <Button onClick={this.updateMetadata} bsStyle="primary">Update Metadata</Button>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
