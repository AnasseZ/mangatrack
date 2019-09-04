import React from "react";

import { AuthConsumer } from "../../contexts/AuthContext";

import NavOnline from "./NavOnline";
import NavOffline from "./NavOffline";

export default () => (
  <AuthConsumer>
    {({ isAuth, login, logout, user }) =>
      isAuth ? <NavOnline logout={logout} user={user}/> : <NavOffline login={login}/>
    }
  </AuthConsumer>
);
