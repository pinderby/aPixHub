import React, { Component } from 'react';
import _ from 'lodash';
import logo from '../../assets/apixhub-icon.svg';
import ProfileContainer from '../../containers/ProfileContainer';
import { fetchAuthUser, fetchPostUser, fetchMe } from '../../actions/users';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    // Check if user token is already stored
    let token = '';

    console.log('user_token: ', localStorage.getItem('user_token')); // TODO --DM-- Remove

    if (localStorage.getItem('user_token') !== null) {
      // If token exists, assign it to state
      token = localStorage.getItem('user_token');

      // If token exists but user does not, get "me"
      if (_.isEmpty(props.user)) props.dispatch(fetchMe()); 
    } 

    // Bind methods
    this.logout = this.logout.bind(this);

    this.state = {
      user: {},
      token: token
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Check if user is now logged in (user object exists)
    let user = {};
    if (nextProps.user && nextProps.user.hasOwnProperty('user')) {
      // Assign user object for state
      user = nextProps.user.user;

      // Save token
      localStorage.setItem('user_token', user.token);
    } 

    return {
      user: user
    };
  }

  logout(e) {
    // Delete token
    localStorage.removeItem('user_token');

    // Erase user from state and rerender
    this.setState({
      user: {}
    });
  }
  
  render() {
    console.log('this.state', this.state); // TODO --DM-- Remove
    console.log('this.props', this.props); // TODO --DM-- Remove

    // Log if user is authenticated
    // console.log("isAuthenticated(): ", isAuthenticated());
    
    // Instantiate body
    let body = "";

    // If user is empty, show login screen
    if (_.isEmpty(this.state.user)) { body = <Splash dispatch={this.props.dispatch} /> }
    // If user is not empty, show profile
    else { body = <ProfileContainer logout={this.logout} user={this.state.user} /> };

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
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.validatePassword = this.validatePassword.bind(this);

    // Initialize state
    this.state = {
      isLoggingIn: true,
      username: "",
      password: "",
      confirm_password: "",
      firstname: "",
      lastname: "",
      email: ""
    };
  }

  login(e) {
    // Dispatch login to log user in with input credentials
    e.preventDefault();
    this.props.dispatch(fetchAuthUser(this.state.username, this.state.password));
  }

  signup(e) {
    // Dispatch sign up call to POST new user with form data
    e.preventDefault();

    // Instantiate user object
    let payload = {
      "user": {
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "fname": this.state.firstname,
        "lname": this.state.lastname
      }
    }

    // Dispatch API call
    this.props.dispatch(fetchPostUser(JSON.stringify(payload)));
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  changeForm(isLoggingIn, event) {
    // isLoggingIn: true = show login form , false = show signup form
    this.setState({isLoggingIn: isLoggingIn});
  }

  validatePassword(password, confirm_password) {
    // Return true if passwords match
    let invalid = (password !== confirm_password) && (confirm_password.length > 0);
    return invalid;
  }

  render() {
    console.log("this.state: ", this.state); // TODO --DM-- Remove
    console.log("this.props: ", this.props); // TODO --DM-- Remove

    let form = "";
    let passwordInvalid = this.validatePassword(this.state.password, this.state.confirm_password);

    if (this.state.isLoggingIn) {
      // Show login form
      form = 
        <form className="form-horizontal" onSubmit={this.login}>
          <div className="form-group">
            <label className="control-label" htmlFor="username">Username:</label>
            <input 
                id="username"
                className="form-control"
                placeholder="Username"
                name="username" 
                type="text" 
                value={this.state.username} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <div className="form-group">
            <label className="control-label" htmlFor="password">Password:</label>
            <input 
                id="password"
                className="form-control"
                placeholder="Password"
                name="password" 
                type="password" 
                value={this.state.password} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <button type="submit" onClick={this.login} className="btn btn-success btn-lg">Log in</button>
          <br />
          <p>Or click here to <a onClick={() => this.changeForm(false)}>sign up.</a></p>
        </form>
    } else {
      // Show sign up form
      form = 
        <form className="form-horizontal" onSubmit={this.signup}>
          <div className="form-group">
            <label className="control-label" htmlFor="firstname">First Name:</label>
            <input 
                id="firstname"
                className="form-control"
                placeholder="First Name"
                name="firstname" 
                type="text" 
                value={this.state.firstname} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <div className="form-group">
            <label className="control-label" htmlFor="lastname">Last Name:</label>
            <input 
                id="lastname"
                className="form-control"
                placeholder="Last Name"
                name="lastname" 
                type="text" 
                value={this.state.lastname} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <div className="form-group">
            <label className="control-label" htmlFor="email">Email:</label>
            <input 
                id="email"
                className="form-control"
                placeholder="Email"
                name="email" 
                type="text" 
                value={this.state.email} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <div className="form-group">
            <label className="control-label" htmlFor="username">Username:</label>
            <input 
                id="username"
                className="form-control"
                placeholder="Username"
                name="username" 
                type="text" 
                value={this.state.username} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <div className="form-group">
            <label className="control-label" htmlFor="password">Password:</label>
            <input 
                id="password"
                className="form-control"
                placeholder="Password"
                name="password" 
                type="password" 
                value={this.state.password} 
                onChange={this.handleInputChange} />
          </div>
          <br />
          <div className={"form-group " + (passwordInvalid ? 'has-error' : '')}>
            <label className="control-label" htmlFor="confirm_password">Confirm Password:</label>
            <input 
                id="confirm_password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirm_password" 
                type="password" 
                value={this.state.confirm_password} 
                onChange={this.handleInputChange} />
              <div className="invalid-feedback">Passwords must match.</div>
          </div>          
          <br />
          <button type="submit" onClick={this.signup} className="btn btn-success btn-lg">Sign up</button>
          <br />
          <p>Already have an account? Click here to <a onClick={() => this.changeForm(true)}>log in.</a></p>
        </form>
    }

    return (
      <div className="home">
        <div className="home-header-container">
          <div className="home-header">
            <img src={logo} className="home-logo" alt="logo" />
            <h2>Welcome to aPixHub</h2>
            {form}
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
