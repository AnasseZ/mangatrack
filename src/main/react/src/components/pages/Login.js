import React from "react";

import { AuthConsumer } from "../../contexts/AuthContext";

export default class Login extends React.Component {
  render() {
    console.log(this.props);
    const { message } = this.props.location.state || {message: "Entrez vos identifants"};

    console.log(message);
    return (
      <AuthConsumer>
        {({ login, isAuth }) =>
          isAuth ? (
            <div>Déjà connecté</div>
          ) : (
            <div>
              <h1>{message}</h1>
              <button onClick={login}>Se connecter</button>
            </div>
          )
        }
      </AuthConsumer>
    );
  }
}
