import React from "react";
import {Link} from "react-router-dom";
import ProfilIcon from "./ProfilIcon";

import {ToggleConsumer} from "../../contexts/ToggleContext";

const NavOnline = ({user, setToggle, toggle}) => {

    const toggleSideBar = () => setToggle(!toggle);

    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container-fluid">
                <span onClick={toggleSideBar}>
                    <i className="fas fa-bars text-white"></i>
                </span>
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
                            <ProfilIcon user={user}/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ({user}) => {
    return (
        <ToggleConsumer>
            {({setToggle, toggle}) =>
                <NavOnline user={user} toggle={toggle} setToggle={setToggle}/>
            }
        </ToggleConsumer>
    )
}