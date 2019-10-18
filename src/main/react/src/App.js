import React, {Component} from "react";
import "./App.css";
import "react-notifications-component/dist/theme.css";

import Navbar from "./components/Navbar/Navbar";
import {Main} from "./components/pages/Main";
import {AuthProvider} from "./contexts/AuthContext"

import {BrowserRouter} from "react-router-dom";
import ReactNotification from "react-notifications-component";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ReactNotification/>
                <BrowserRouter>
                    <AuthProvider>
                        <Navbar/>
                        <Main/>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
