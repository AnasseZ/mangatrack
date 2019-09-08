import React from "react";

import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";

export class LoginPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: ""
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

  login = () => {
    this.props.login(this.state.usernameValue, this.state.passwordValue);
  };

  render() {
    return (
      <Popover
        placement="bottom"
        isOpen={this.props.isOpen}
        target="bntLogin"
        toggle={this.props.toggleLoginPopin}
      >
        <PopoverHeader>Connexion</PopoverHeader>
        <PopoverBody>
          <h6 style={{ color: "black" }}>Renseignez vos identifiants</h6>
          <Form>
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="usernameLogin"
                placeholder="Nom d'utilisateur / mail"
                onChange={this.onChangeUsername}
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
            <Button id="btnFormLogin" color="info" onClick={this.login}>
              Se connecter
            </Button>
          </Form>
          <hr />
          Pas de compte ?{" "}
          <a
            href="#"
            onClick={() => {
              this.props.toggleLoginPopin();
              this.props.toggleSignInPopin();
            }}
          >
            S'inscrire.
          </a>
        </PopoverBody>
      </Popover>
    );
  }
}
