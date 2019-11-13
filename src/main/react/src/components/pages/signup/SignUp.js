import React, {useState} from "react";

import {AuthConsumer} from "../../../contexts/AuthContext";
import {passwordOk} from "../../../util/validation";
import {register} from "../../../services/UserService";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";

const SignUpPage = ({isAuth, history}) => {

    const [formState, setFormState] = useState({
        usernameForm: '',
        passwordForm: '',
        passwordAgainForm: '',
        emailForm: ''
    });

    const onChangeField = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const registerUser = () => {
        if (passwordOk(formState.passwordForm, formState.passwordAgainForm)) {
            register(
                {
                    username: formState.usernameForm,
                    password: formState.passwordForm,
                    email: formState.emailForm
                },
                registerOk,
                registerError
            );
        }
    };

    const registerOk = () => {
        addSuccessNotification("Inscription réussie.");

        history.push({
            pathname: '/login',
            state: {
                message: 'Inscription réussi ! Veuillez maintenant vous connecter.'
            }
        });
    };

    const registerError = () => {
        addErrorNotification("Erreur ! Vous n'avez pas pu vous inscrire.");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    };

    if (isAuth) {
        history.push('/');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5 shadow bg-white">
                        <div className="card-body">
                            <h5 className="card-title text-center text-dark">Inscription</h5>
                            <form className="form-signin" onSubmit={handleSubmit}>
                                {/* Username */}
                                <div className="form-label-group">
                                    <input id="usernameForm" className="form-control" name="usernameForm"
                                           placeholder="Nom d'utilisateur" required autoFocus
                                           onChange={onChangeField}/>
                                    <label htmlFor="usernameForm">Nom d'utilisateur</label>
                                </div>
                                {/* Mail */}
                                <div className="form-label-group">
                                    <input id="emailForm" className="form-control" name="emailForm"
                                           placeholder="E-mail" required autoFocus
                                           onChange={onChangeField}/>
                                    <label htmlFor="emailForm">E-mail</label>
                                </div>
                                {/* Password */}
                                <div className="form-label-group">
                                    <input type="password" id="passwordForm" className="form-control"
                                           name="passwordForm"
                                           placeholder="Mot de passe" required onChange={onChangeField}/>
                                    <label htmlFor="passwordForm">Mot de passe</label>
                                </div>
                                {/* Confirm Password  */}
                                <div className="form-label-group">
                                    <input type="password" id="passwordAgainForm" className="form-control"
                                           name="passwordAgainForm"
                                           placeholder="Confirmer mot de passe" required onChange={onChangeField}/>
                                    <label htmlFor="passwordAgainForm">Confirmer mot de passe</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                        type="submit" onClick={handleSubmit}>S'inscrire.
                                </button>
                                <hr className="my-4"/>
                                <p className="text-dark">Déjà inscrit ?{' '}
                                    <a href="/signup">Se connecter.</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SignUp = (props) => {
    return (
        <AuthConsumer>
            {({isAuth}) => <SignUpPage isAuth={isAuth} {...props}/>}
        </AuthConsumer>
    )
};
