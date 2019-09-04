import React from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthConsumer } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <AuthConsumer>
      {({ isAuth }) => (
        <Route
          render={props =>
            isAuth ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
          {...rest}
        />
      )}
    </AuthConsumer>
  );
}
