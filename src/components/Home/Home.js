import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../../services/Auth.js';
import logo from '../../assets/apixhub-icon.svg';
import ProfileContainer from '../../containers/ProfileContainer';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
        
    // Instantiate Auth object
    const auth = new Auth();

    // Bind methods
    this.logout = this.logout.bind(this);

    this.state = {
      auth: auth,
    };
  }

  logout(e) {
    // Log out using auth0
    this.state.auth.logout();
    this.forceUpdate()
  }
  
  render() {
    // Instantiate authentication check from Auth0
    const { isAuthenticated } = this.state.auth;

    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // Log if user is authenticated
    console.log("isAuthenticated(): ", isAuthenticated());
    
    // Instantiate body
    let body = "";
    if (!isAuthenticated()) { body = <Splash auth={this.state.auth} /> }
    else { body = <ProfileContainer auth={this.state.auth} /> };

    return (
      <div className="home-container">
        <Button onClick={this.logout} bsStyle="danger">Log out</Button>
        {body}
      </div>
    );
  }
}

class Splash extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.login = this.login.bind(this);
  }

  login(e) {
    // Begin auth0 auth process
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="home">
        <div className="home-header-container">
          <div className="home-header">
            <img src={logo} className="home-logo" alt="logo" />
            <h2>Welcome to aPixHub</h2>
            <button type="button" onClick={this.login} className="btn btn-success btn-lg">Sign up</button>
            <button type="button" onClick={this.login} className="btn btn-success btn-lg">Log in</button>
          </div>
        </div>
        <p className="home-intro">
          {/* To get started, edit <code>src/Home.js</code> and save to reload. */}
        </p>
      </div>
    );
  }
}

export default Home;
