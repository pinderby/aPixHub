import React, { Component } from 'react';
import './IMDbClone.css';
import logan from './logan.json'; // JSON: http://www.objgen.com/json/models/2wFt3
import moment from 'moment';
import Helpers from './helpers.js';

class IMDbClone extends Component {
  render() {
    return (
      <div id="IMDb-container">
        <IMDbNavbar />
        <div className="imdb-container container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-7">
              <IMDbMainBody />
            </div>
            <div className="col-md-3">
              <IMDbSidebar />
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

class IMDbNavbar extends Component {
  render() {
    return (
      <div id="IMDb-navbar">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">MovieDb</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <form className="navbar-form navbar-left">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <select className="form-control nav-select">
                      <option>All</option>
                      <option>Actors</option>
                      <option>Characters</option>
                      <option>Keywords</option>
                      <option>Companies</option>
                    </select>
                    <button type="submit" className="btn btn-default">Search</button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-md-1"></div>
        </div> {/*row*/}
      </div>
    );
  }
}

class IMDbMainBody extends Component {
  render() {
    return (
      <div id="IMDb-mainbody">
      </div>
    );
  }
}

class IMDbSidebar extends Component {
  render() {
    return (
      <div id="IMDb-sidebar">
      </div>
    );
  }
}



export default IMDbClone;
