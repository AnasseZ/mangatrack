import React from "react";
import * as jwt_decode from "jwt-decode";

import { apiRoot } from "../constantes/apiInformations";
import { getUserById, getUserToken } from "../services/UserService";
import LoadingPage from "../components/pages/LoadingPage";

const AuthContext = React.createContext();

const tokenName = "auth_token";
const storedUserId = "auth_userId";

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.userConnexionOk = this.userConnexionOk.bind(this);
    this.userConnexionError = this.userConnexionError.bind(this);
    this.updateIsAuth = this.updateIsAuth.bind(this);
    this.updateIsLoaded = this.updateIsLoaded.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.setToken = this.setToken.bind(this);

    this.state = {
      isLoaded: false,
      isAuth: false,
      apiRoot: apiRoot,
      token: "",
      user: null,
      error: null
    };
  }

  login(userId, password) {
    getUserToken(
      userId,
      password,
      token => {
        this.setToken(token);
        this.verifyUser();
      },
      this.userConnexionError
    );
  }

  componentDidMount() {
    this.verifyUser();
  }

  logout() {
    this.updateIsAuth(false);
    localStorage.removeItem(tokenName);
    localStorage.removeItem(storedUserId);
  }

  userConnexionOk(user) {
    this.setState({ user: user });
    this.updateIsAuth(true);
    this.updateIsLoaded(true);

    // pas d'erreur token OK et userId aussi
    this.updateToken();
  }

  updateIsLoaded(isLoaded) {
    this.setState({ isLoaded: isLoaded });
  }

  updateToken() {
    this.setState({ token: localStorage.getItem(tokenName) });
  }

  setToken(token) {
    localStorage.setItem(tokenName, token.token);

    const jtwDecoded = jwt_decode(token.token);
    localStorage.setItem(storedUserId, jtwDecoded["id"]);
  }

  userConnexionError(error) {
    this.setState({ error: error });
    this.updateIsLoaded(true);

    // Erreur donc token réinitialisé et userId aussi
    localStorage.removeItem(tokenName);
    localStorage.removeItem(storedUserId);

    this.updateToken();
  }

  updateIsAuth(isAuth) {
    this.setState({ isAuth: isAuth });
  }

  verifyUser() {
    let tokenStored = localStorage.getItem(tokenName);
    let userId = localStorage.getItem(storedUserId);

    // Si le token et userId existent ( user deja co... on verifie)
    if (tokenStored !== null && userId !== null) {
      // envoyer au serveur le token pour recuperer son profil
      getUserById(
        userId,
        tokenStored,
        this.userConnexionOk,
        this.userConnexionError
      );
    } else {
      // Premiere visite, on load la page principale
      this.updateIsLoaded(true);
    }
  }

  render() {
    const { isLoaded } = this.state;
    return isLoaded === true ? (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          apiRoot: this.state.apiRoot,
          login: this.login,
          logout: this.logout,
          user: this.state.user,
          token: this.state.token
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    ) : (
      <LoadingPage />
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
