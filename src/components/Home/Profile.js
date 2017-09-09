// src/Profile/Profile.js

import React, { Component } from 'react';
import { Button, Panel, ControlLabel, Glyphicon, Image } from 'react-bootstrap';
import { fetchNode, updateNode } from '../../actions/nodes';
import { Link } from 'react-router-dom';
import Auth from '../../services/Auth.js';
import NodeSearchResult from '../NodeInstance/NodeSearchResult.js';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
        
    // Instantiate Auth object
    const auth = new Auth();

    // Bind methods
    this.updateMetadata = this.updateMetadata.bind(this);

    // Add status constants
    this.FETCH_STATUS = {
      FETCHING: 'FETCHING',
      PROFILE_FETCHED: 'PROFILE_FETCHED',
      METADATA_FETCHED: 'METADATA_FETCHED',
      USER_FETCHED: 'USER_FETCHED',
      REPOS_FETCHED: 'REPOS_FETCHED'
    }

    this.state = {
      auth: auth,
      user: {},
      repos: [],
      fetchStatus: this.FETCH_STATUS.FETCHING
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile, getMetadata } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ 
          profile, 
          fetchStatus: this.FETCH_STATUS.PROFILE_FETCHED 
        });
        getMetadata((profile) => {
          this.setState({ 
            profile, 
            fetchStatus: this.FETCH_STATUS.METADATA_FETCHED 
          });
            // Dispatch fetchNode to get node by label and id
            this.props.dispatch(fetchNode('test_user', profile.user_metadata.apix_id)); // TODO --DTM-- Update
        });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentWillReceiveProps(nextProps) {
    // If redirected without content updated, fetch new node
    let fetchStatus, user, instance, repos = [];
    if (!nextProps.node.instance) return;

    instance = nextProps.node.instance;
    
    console.log("nextProps: ", nextProps);
    console.log("this.state.fetchStatus: ", this.state.fetchStatus);
    if (this.state.fetchStatus === this.FETCH_STATUS.METADATA_FETCHED) { 
      fetchStatus = this.FETCH_STATUS.USER_FETCHED
      user = instance;
      
      // Dispatch fetchNode to get node by label and id
      instance.relationships.in.forEach((rel) => {
        console.log("nid: ", rel.nid);
        this.props.dispatch(fetchNode('test_repo', rel.nid));
      });

    }

    if (this.state.fetchStatus === this.FETCH_STATUS.USER_FETCHED ||
        this.state.fetchStatus === this.FETCH_STATUS.REPOS_FETCHED) {
      fetchStatus = this.FETCH_STATUS.REPOS_FETCHED;
      repos.push(instance);
    }

    user = Object.assign(this.state.user, user);

    // Sync redux store with state
    this.setState({
      node: nextProps.node,
      user,
      repos,
      fetchStatus
    });
  }

  updateMetadata() {
    let payload = {};
    // TODO --DTM-- Prepare payload
    this.state.auth.updateMetadata(payload);
  }

  render() {
    console.log("state: ", this.state); // TODO --DTM-- Remove
    console.log("props: ", this.props); // TODO --DTM-- Remove

    const { profile } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-area">
          <Panel header="Profile">
            <Image className="profile-pic" src={profile.picture} rounded alt="profile" />
            <h2>{profile.name}</h2>
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            <Button onClick={this.updateMetadata} bsStyle="primary">Update Metadata</Button>
          </Panel>
        </div>
        <div className="repo-area">
          <Panel header="Repos">
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
        <Link key={repo.nid} to={"/n/test_repo/"+repo.nid} 
                    onClick={() => updateNode(repo)}>
          <NodeSearchResult key={index} node={repo} />
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
