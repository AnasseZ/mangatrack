import React from "react";

import { AuthConsumer } from "../../../contexts/AuthContext";
import { FindManga } from "./FindManga";
import { Title } from "../../shared/Title";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <Title title="Suivre un manga" />
            <br />
            <br />
            <AuthConsumer>
              {({token}) =>
                  <FindManga token={token} />
              }
            </AuthConsumer>
          </div>
        </div>
      </div>
    );
  }
}
