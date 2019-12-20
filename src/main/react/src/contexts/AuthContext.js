import React, {useState, useEffect} from "react";

import {tokenName} from "../constantes/apiInformations";
import {getCurrentUser, getUserToken} from "../services/UserService";
import LoadingPage from "../components/pages/loading/LoadingPage";
import {addErrorNotification, addNotification, addSuccessNotification} from "../util/notification";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    const login = (userId, password) => {
        getUserToken(
            userId,
            password,
            token => {
                localStorage.setItem(tokenName, token.accessToken);
                verifyUser();
                addSuccessNotification("Connexion réussie.");
            },
            userConnexionError
        );
    };

    useEffect(() => {
        verifyUser();
    }, []);

    const logout = () => {
        updateIsAuth(false);
        localStorage.removeItem(tokenName);
        addNotification("Déconnexion réussie.", 'info');
    };

    const userConnexionOk = user => {
        setUser(user);
        updateIsAuth(true);
        setIsLoaded(true);

        // pas d'erreur token OK
        setToken(localStorage.getItem(tokenName));
    };

    const userConnexionError = error => {
        setError(error);
        setIsLoaded(true);

        // Erreur donc token réinitialisé
        localStorage.removeItem(tokenName);
        setToken(localStorage.getItem(tokenName));

        addErrorNotification("Erreur ! Vous n'avez pas pu vous connectez.");
    };

    const updateIsAuth = isAuth => {
        setIsAuth(isAuth);
    };

    const verifyUser = () => {
        let tokenStored = localStorage.getItem(tokenName);

        // Si le token existe ( user deja co sur la machine... on verifie)
        if (tokenStored !== null) {
            // envoyer au serveur le token pour recuperer son profil
            getCurrentUser(
                tokenStored,
                userConnexionOk,
                userConnexionError
            );
        } else {
            // Premiere visite, on load la page principale
            setIsLoaded(true);
        }
    };

    return isLoaded === true ? (
        <AuthContext.Provider
            value={{
                isAuth: isAuth,
                login: login,
                logout: logout,
                user: user,
                token: token,
                setUser: setUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    ) : (
        <LoadingPage/>
    );
};

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};
