import React from "react";

import { AuthConsumer } from "../../contexts/AuthContext";

import {LandingPage} from "./home/LandingPage";
import {Dashboard} from "./dashboard/Dashboard";

export default () => (
  <AuthConsumer>
    {({ isAuth}) =>
      isAuth ? <Dashboard /> : <LandingPage />
    }
  </AuthConsumer>
);
