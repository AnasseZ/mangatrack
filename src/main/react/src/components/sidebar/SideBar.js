import React from "react";
import {Link, NavLink} from "react-router-dom";
import {AuthConsumer} from "../../contexts/AuthContext";
import {ToggleConsumer} from "../../contexts/ToggleContext";

const SideBarComponent = ({toggle}) => {

    const toggleClass = toggle ? `toggled` : '';

    return (
        <>
            <ul className={`navbar-nav bg-gradient-primary sidebar ${toggleClass} sidebar-dark accordion`} id="accordionSidebar">

                <Link className="sidebar-brand d-flex align-items-center justify-content-center p-3" to="/">
                    <img
                        src="https://i.pinimg.com/originals/0d/8d/07/0d8d07a763e83f93acf810ae2c523bd7.png"
                        alt="logo"
                        id="logo"
                    />
                </Link>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/" activeClassName="active">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Mangas
                </div>

                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/dashboard/mangas" activeClassName="active">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Mes mangas</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/search-manga" activeClassName="active">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Suivre un manga</span>
                    </NavLink>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Séries
                </div>

                <li className="nav-item">
                    <a className="nav-link " href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Mes séries</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link " href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Suivre une série</span>
                    </a>
                </li>
            </ul>
        </>
    )
};

export default () => (
    <AuthConsumer>
        {({isAuth}) =>
            <ToggleConsumer>
                {
                    value => {
                        if (isAuth) return <SideBarComponent {...value}/>
                    }
                }
            </ToggleConsumer>
        }
    </AuthConsumer>
);
