import React from "react";

import { AuthConsumer } from "../../contexts/AuthContext";

import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./home/LandingPage";

export default () => (
  <AuthConsumer>
    {({ isAuth}) =>
      isAuth ? <Dashboard /> : <LandingPage />
    }
  </AuthConsumer>
);
