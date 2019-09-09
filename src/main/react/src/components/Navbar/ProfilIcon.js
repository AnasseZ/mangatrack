import React from "react";

import { ProfilPopover } from "./popovers/ProfilPopover";
import {AuthConsumer} from "../../contexts/AuthContext";

export default class ProfilIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    };
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  render() {
    return (
      <>
        <span className="fa-stack fa-2x">
          <i className="fas fa-circle fa-stack-1x profilIcon" />
          <p className="fa-stack-1x text-white" onClick={() => {this.toggle();console.log(this.state.popoverOpen)}} id="userIcon">
            {this.props.user.username[0]}
          </p>
        </span>
        <AuthConsumer>
          {({ logout }) =>
              <ProfilPopover isOpen={this.state.popoverOpen} toggle={this.toggle} logout={logout} />
          }
        </AuthConsumer>
      </>
    );
  }
}

/* 

<a className="nav-link" href="/" onClick={this.props.logout}>
                  Se déconnecter
                </a>
*/
