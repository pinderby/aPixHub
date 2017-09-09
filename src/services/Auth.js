// src/services/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'pinderby.auth0.com',
    clientID: 'VWLgAvNY9t10QtsHZauXKzCCWNG3bPv8',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://pinderby.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile user_id'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getMetadata = this.getMetadata.bind(this);
  }  

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.pushState({ rerender: true }, 'Home', '/home');
        console.log("history ", history);
      } else if (err) {
        history.replaceState({}, 'Home', '/home ');
        console.log(err);
      }
    });
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getIdToken() {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No id token found');
    }
    return idToken;
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replaceState({}, 'Home', '/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replaceState({}, 'Home', '/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        Auth.userProfile = profile;
      }
      cb(err, profile);
    });
    console.log("this.userProfile: ", this);
  }

  getMetadata(cb) {
    let idToken = this.getIdToken();

    // Send api call to update auth0 metadata
    fetch(`https://pinderby.auth0.com/api/v2/users/${Auth.userProfile.sub}`, {
      headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${idToken}`
        }),
      method: 'GET',
      qs: { fields: 'user_metadata', include_fields: 'true' },
    })
    .then(function(response){ 
      // Log response from server
      console.log('getMetadata() response: ', response); // TODO --DM-- Remove
      // Auth.userProfile = Object.assign(Auth.userProfile, response);
      response.json().then(function(data){ 
        console.log('getMetadata() success data: ', data); // TODO --DM-- Remove
        cb(data);
      });
    })
    .catch(function(error) {
      // Log error from server
      console.log('getMetadata() error: ', error); // TODO --DM-- Remove
    });
  }

  updateMetadata(data) {
    // Merge data with existing metadata and prepare payload
    Auth.userProfile.user_metadata = Object.assign({}, Auth.userProfile.user_metadata);
    let metadata = Object.assign(Auth.userProfile.user_metadata, data);
    let payload = JSON.stringify({ user_metadata: metadata }).replace('"[\\', '[').replace('\\"]"', '"]');

    // Send api call to update auth0 metadata
    fetch(`https://pinderby.auth0.com/api/v2/users/${Auth.userProfile.sub}`, {
      headers: new Headers({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.getIdToken()}`
        }),
      method: 'PATCH',
      body: payload,
      json: true
    })
    .then(function(response){ 
      // Log response from server
      console.log('updateMetadata() response: ', response); // TODO --DM-- Remove
      return response.json();
    })
    .then(function(data){ 
      console.log('updateMetadata() success data: ', data); // TODO --DM-- Remove
    })
    .catch(function(error) {
      // Log error from server
      console.log('updateMetadata() error: ', error); // TODO --DM-- Remove
    });
  }
}