import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import { LoginPopover } from "../popovers/LoginPopover";
import { SignInPopover } from "../popovers/SignInPopover";

class NavOffline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPopoverOpen: false,
      signInPopoverOpen: false
    };
  }

  toggleLoginPopin = () => {
    this.setState({
      loginPopoverOpen: !this.state.loginPopoverOpen
    });
  };

  toggleSignInPopin = () => {
    this.setState({
      signInPopoverOpen: !this.state.signInPopoverOpen
    });
  };

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
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Button
                  outline
                  color="info"
                  id="bntLogin"
                  onClick={this.toggleLoginPopin}
                >
                  Se connecter
                </Button>
                <LoginPopover
                  isOpen={this.state.loginPopoverOpen}
                  toggleLoginPopin={this.toggleLoginPopin}
                  toggleSignInPopin={this.toggleSignInPopin}
                  login={this.props.login}
                />
              </li>
              <li className="nav-item">
                <Button
                  color="info"
                  id="btnSignIn"
                  onClick={this.toggleSignInPopin}
                >
                  S'inscrire
                </Button>
                <SignInPopover
                  isOpen={this.state.signInPopoverOpen}
                  toggleLoginPopin={this.toggleLoginPopin}
                  toggleSignInPopin={this.toggleSignInPopin}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavOffline;
