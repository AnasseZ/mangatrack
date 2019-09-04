import React from "react";

import { AuthConsumer } from "../../contexts/AuthContext";

import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";

export default () => (
  <AuthConsumer>
    {({ isAuth}) =>
      isAuth ? <Dashboard /> : <LandingPage />
    }
  </AuthConsumer>
);
