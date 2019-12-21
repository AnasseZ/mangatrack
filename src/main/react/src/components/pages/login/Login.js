import React, {useState} from "react";

import {AuthConsumer} from "../../../contexts/AuthContext";

const LoginPage = ({login, isAuth, history, location}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = e => {
        setUsername(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        login(username, password);
    };

    if (isAuth) {
        history.push('/');
    }

    return (
        <>
            <h5>{
                location.state ? location.state.message : ''
            }
            </h5>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5 shadow bg-white">
                            <div className="card-body">
                                <h5 className="card-title text-center text-dark">Connexion</h5>
                                <form className="form-signin" onSubmit={handleSubmit}>
                                    <div className="form-label-group">
                                        <input id="inputEmailUsername" className="form-control"
                                               placeholder="Nom d'utilisateur / mail" required
                                               onChange={onChangeUsername}/>
                                        <label htmlFor="inputEmailUsername">Nom d'utilisateur / mail</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="inputPasswordLoginPage" className="form-control"
                                               placeholder="Mot de passe" required onChange={onChangePassword}/>
                                        <label htmlFor="inputPasswordLoginPage">Mot de passe</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit" onClick={handleSubmit}>Se connecter
                                    </button>
                                    <hr className="my-4"/>
                                    <p className="text-dark">Pas encore de compte ?{' '}
                                        <a href="/signup">S'inscrire.</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Login = props => {
    return (
        <AuthConsumer>
            {({login, isAuth}) => <LoginPage login={login} isAuth={isAuth} {...props}/>}
        </AuthConsumer>
    )
};
