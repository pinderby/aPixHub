import React, { Component } from 'react';
import Auth from '../../services/Auth.js';
import logo from '../../assets/apixhub-icon.svg';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
        
    // Instantiate Auth object
    const auth = new Auth();

    this.state = {
      auth: auth,
    };
  }
  
  render() {
    // Instantiate authentication check from Auth0
    const { isAuthenticated } = this.state.auth;

    // Log if user is authenticated
    console.log("isAuthenticated(): ", isAuthenticated());
    
    // Instantiate body
    let body = "";
    if (!isAuthenticated()) { body = <Splash auth={this.state.auth} /> };

    return (
      <div className="home-container">
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
    this.logout = this.logout.bind(this);
  }

  login(e) {
    // Begin auth0 auth process
    this.props.auth.login();
  }

  logout(e) {
    // Log out using auth0
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

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
