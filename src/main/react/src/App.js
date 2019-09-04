import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Main } from "./components/pages/Main";
import { AuthProvider } from "./contexts/AuthContext"

import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Main />
          </AuthProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
