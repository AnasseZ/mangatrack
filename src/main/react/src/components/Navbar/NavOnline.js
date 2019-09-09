import React, { Component } from "react";
import { Link } from "react-router-dom";
import  ProfilIcon  from "./ProfilIcon";

class NavOffline extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://i.pinimg.com/originals/0d/8d/07/0d8d07a763e83f93acf810ae2c523bd7.png"
              alt="logo"
              id="logo"
            />
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Mes mangas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search-manga">
                  Suivre un manga
                </Link>
              </li>
              <li className="nav-item">
                <ProfilIcon user={this.props.user} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavOffline;
