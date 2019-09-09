import React from "react";
import { Redirect } from "react-router-dom";
import { register } from "../../../services/UserService";

import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";

export class SignUpPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: "",
      emailValue: "",
      passwordAgainValue: "",
      isRegistred: false
    };
  }

  onChangeUsername = e => {
    this.setState({
      usernameValue: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      passwordValue: e.target.value
    });
  };

  onChangeEmail = e => {
    this.setState({
      emailValue: e.target.value
    });
  };

  onChangePasswordAgainValue = e => {
    this.setState({
      passwordAgainValue: e.target.value
    });
  };

  registerOk = () => {
    // update context ( cf doc )
    this.setState({
      isRegistred: true
    });

  };

  registerError = () => {
    // pb d'inscription
    this.setState({
      isRegistred: false
    });
  };

  formOk = () => {
    if (
      this.state.passwordValue !== "" &&
      this.state.passwordValue === this.state.passwordAgainValue &&
      this.state.passwordValue.length >= 8 &&
      this.state.passwordValue.length <= 100
    ) {
      // if email valide prochainement

      return true;
    }

    return false;
  };

  register = () => {
    if (this.formOk()) {
      register(
        {
          username: this.state.usernameValue,
          password: this.state.passwordValue,
          email: this.state.emailValue
        },
        this.registerOk,
        this.registerError
      );
    }
  };

  render() {
    return this.state.isRegistred ?
      <Redirect
        to={{
          pathname: "/login",
          state: { message: "Inscription réussi ! Saisissez vos identifiants pour vous connecter", }
        }}
      />
      :
      (
        <Popover
          placement="bottom"
          isOpen={this.props.isOpen}
          target="btnSignIn"
          toggle={this.props.toggleSignUpPopin}
        >
          <PopoverHeader>Inscription</PopoverHeader>
          <PopoverBody>
            <h6 style={{ color: "black" }}>Ajoutez vos informations</h6>
            <Form>
              <FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nom d'utilisateur"
                    onChange={this.onChangeUsername}
                  />
                </FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="emailLogin"
                  placeholder="E-mail"
                  onChange={this.onChangeEmail}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="passLogin"
                  placeholder="Mot de passe"
                  onChange={this.onChangePassword}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="passLoginAgain"
                  placeholder="Confirmer mot de passe"
                  onChange={this.onChangePasswordAgainValue}
                />
              </FormGroup>
              <Button id="btnFormLogin" color="info" onClick={this.register}>
                S'inscrire
            </Button>
            </Form>
            <hr />
            Vous avez déjà un compte ?{" "}
            <a
              href="#"
              onClick={() => {
                this.props.toggleSignUpPopin();
                this.props.toggleLoginPopin();
              }}
            >
              Se connecter
          </a>
          </PopoverBody>
        </Popover>
      );
  }
}
