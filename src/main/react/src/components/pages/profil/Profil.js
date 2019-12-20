import React, {useState} from "react";
import {AuthConsumer} from "../../../contexts/AuthContext";
import {passwordsOk, passwordRangeOk, samePasswords, textNotNull, passwordOk} from "../../../util/validation";
import {updateUser} from "../../../services/UserService";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";

const Profil = ({user, setUser}) => {

    const [formState, setFormState] = useState({
        username: user.username,
        newPasswordAgain: '',
        newPassword: '',
        email: user.email
    });

    const [modifyPassword, setModifyPassword] = useState(false);

    const onChangeField = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const updateUserProfil = () => {
        updateUser(
            user.id,
            {
                id: user.id,
                username: formState.username,
                newPassword: formState.newPassword,
                newPasswordAgain: formState.newPasswordAgain,
                email: formState.email,
                modifyPassword: modifyPassword
            },
            updateOk,
            updateError
        );
    };

    const updateOk = user => {
        setUser(user);
        addSuccessNotification("Modifications réussie.");
    };

    const updateError = () => {
        addErrorNotification("Erreur ! Vous n'avez pas pu modifier les informations.");
    };

    const handleSubmit = event => {
        event.preventDefault();
        updateUserProfil();
    };

    const updateWantModifyPassword = () => {
        setModifyPassword(!modifyPassword);
    };

    /**
     * Disable save button if password and new password and confirmartion
     * are under 8 chars
     * @type {boolean}
     */
    const disableButton = modifyPassword && !passwordsOk(formState.newPassword, formState.newPasswordAgain);


    const newPasswordValidation = modifyPassword && textNotNull(formState.newPassword) ?
        passwordRangeOk(formState.newPassword) ? 'is-valid' : '' : '';

    const newPasswordAgainValidation = modifyPassword && textNotNull(formState.newPasswordAgain)
        ? passwordRangeOk(formState.newPasswordAgain) && samePasswords(formState.newPassword, formState.newPasswordAgain)
            ? 'is-valid' : 'is-invalid' : '';

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card my-5 shadow bg-white">
                        <div className="card-body p-4">
                            <h2 className="text-center text-dark">Profil</h2>
                            <form id="profilForm" className="rounded-inputs label-black mt-4"
                                  autoComplete="new-password">
                                <div className="form-group">
                                    <label htmlFor="username">Nom d'utilisateur</label>
                                    <input className="form-control" id="username"
                                           aria-describedby="username"
                                           placeholder="Nom d'utilisateur" name="username"
                                           value={formState.username}
                                           minLength={3}
                                           onChange={onChangeField}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Nom d'utilisateur</label>
                                    <input className="form-control" id="email"
                                           aria-describedby="email" name="email"
                                           placeholder="Email"
                                           value={formState.email}
                                           onChange={onChangeField}
                                    />
                                </div>
                                <a data-toggle="collapse" href="#changePassword" onClick={updateWantModifyPassword}
                                   className="text-decoration-none"
                                   role="button" aria-expanded="false" aria-controls="changePassword">
                                    Changer le mot de passe
                                </a>
                                <div className="collapse mt-3" id="changePassword">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Nouveau mot de passe<span
                                            className="text-danger">*</span></label>
                                        <input type="password" id="newPassword"
                                               className={'form-control ' + newPasswordValidation}
                                               name="newPassword"
                                               value={formState.newPassword}
                                               placeholder="Nouveau mot de passe" onChange={onChangeField}
                                               minLength={8}
                                               required={modifyPassword}
                                               autoComplete="new-password"
                                        />
                                        <div className="valid-feedback">
                                            C'est ok!
                                        </div>
                                        <div className="invalid-feedback">
                                            Mot de passe de 8 lettres minimum.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Confirmer le nouveau mot de passe<span
                                            className="text-danger">*</span></label>
                                        <input type="password" id="newPasswordAgain"
                                               className={'form-control ' + newPasswordAgainValidation}
                                               name="newPasswordAgain"
                                               value={formState.newPasswordAgain}
                                               placeholder="Confirmer le nouveau mot de passe"
                                               minLength={8}
                                               onChange={onChangeField} required={modifyPassword}
                                               autoComplete="new-password"
                                        />
                                        <div className="valid-feedback">
                                            C'est ok!
                                        </div>
                                    </div>
                                    <div className="small">
                                        <span className="text-danger">*</span>
                                        <span className="font-italic font-weight-light">
                                            Le mot de passe doit être compris entre 8 et 100 caractères.
                                        </span>
                                    </div>
                                </div>
                                <hr className="my-4"/>
                                <button type="button" className="btn btn-outline-danger btn-sm border-0">
                                    <i className="fas fa-exclamation-circle"></i> Supprimer mon compte
                                </button>
                                <br/>
                                <button type="submit" className="btn btn-primary float-right"
                                        onClick={handleSubmit}
                                        disabled={disableButton}
                                >Enregistrer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default () => (
    <AuthConsumer>
        {({user, setUser}) => <Profil user={user} setUser={setUser}/>
        }
    </AuthConsumer>
);