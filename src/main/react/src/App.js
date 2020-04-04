import React, {Component} from "react";
import "./App.css";
import "react-notifications-component/dist/theme.css";

import Navbar from "./components/Navbar/Navbar";
import {MainRouter} from "./components/pages/MainRouter";
import {AuthProvider} from "./contexts/AuthContext"

import {BrowserRouter} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import SideBar from "./components/sidebar/SideBar";
import {ToggleProvider} from "./contexts/ToggleContext";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ReactNotification/>
                <BrowserRouter>
                    <AuthProvider>
                        <ToggleProvider>
                            <div className="d-flex">
                                <SideBar/>
                                <div className="w-100">
                                    <Navbar/>
                                    <MainRouter/>
                                </div>
                            </div>
                        </ToggleProvider>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
