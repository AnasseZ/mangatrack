import React, {Component} from "react";
import {Link} from "react-router-dom";

class NavOffline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPopoverOpen: false,
            signUpPopoverOpen: false
        };
    }

    toggleLoginPopin = () => {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen,
            signUpPopoverOpen: false
        });
    };

    toggleSignUpPopin = () => {
        this.setState({
            signUpPopoverOpen: !this.state.signUpPopoverOpen,
            loginPopoverOpen: false
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
                        <i className="fa fa-bars"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="btn btn-sm btn-link text-white text-decoration-none" to="/login">
                                    Se connecter
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-sm bg-white font-weight-bold text-info" to="/signup">
                                    S'inscrire
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavOffline;
