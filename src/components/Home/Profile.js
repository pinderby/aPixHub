// src/Profile/Profile.js

import React, { Component } from 'react';
import { Button, Panel, ControlLabel, Glyphicon, Image } from 'react-bootstrap';
import { fetchNode, updateNode } from '../../actions/nodes';
import { Link } from 'react-router-dom';
import NodeSearchResult from '../NodeInstance/NodeSearchResult.js';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    // this.updateMetadata = this.updateMetadata.bind(this);

    this.state = {
      user: props.user,
      repos: props.user.repos,
    };
  }



  render() {
    console.log("state: ", this.state); // TODO --DTM-- Remove
    console.log("props: ", this.props); // TODO --DTM-- Remove

    let user = this.state.user;
    return (
      <div className="profile-container">
        <div className="profile-area">
          <Panel header="Profile">
            {/* <Image className="profile-pic" src={profile.picture} rounded alt="profile" /> */}
            <h2>{user.fname + " " + user.lname}</h2>
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Username</ControlLabel>
              <h3>{user.username}</h3>
            </div>
            {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
            {/* <Button onClick={this.updateMetadata} bsStyle="primary">Update Metadata</Button> */}
            <Button onClick={this.props.logout} bsStyle="danger">Log out</Button>
          </Panel>
        </div>
        <div className="repo-area">
          <Panel header="Repos">
            <h4>Data Repositories</h4>
            <ReposList repos={this.state.repos} />
          </Panel>
        </div>
      </div>
    );
  }
}

class ReposList extends Component {
  renderRepos() {
    // Initialize variables
    let repos = [];

    console.log('repos: ', this.props.repos);

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( this.props.repos ) !== '[object Array]' ) return;

    // Iterate through nodes
    this.props.repos.forEach(function (repo, index) {
      // Wrap router link and render props in NodeSearchResult
      repos.push(
        <Link key={repo.id} to={"/n/test_repo/"+repo.id} 
                    onClick={() => updateNode(repo)}>
          <div id="node-search-result-container" className="panel panel-default">
            <div className="panel-body">
              <div className="node-property-container">
                <div className="node-property">
                  Name: {repo.name}
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
    return repos;
  }
  
  render() {
    return (
      <div id="repos-area">
        {this.renderRepos()}
      </div>
    );
  }
}

export default Profile;
