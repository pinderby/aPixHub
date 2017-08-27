// src/services/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'pinderby.auth0.com',
    clientID: 'VWLgAvNY9t10QtsHZauXKzCCWNG3bPv8',
    redirectUri: 'http://localhost:3000',
    audience: 'https://pinderby.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}