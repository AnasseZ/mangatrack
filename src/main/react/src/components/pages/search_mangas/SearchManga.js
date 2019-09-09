import React from "react";
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
            <FindManga />
          </div>
        </div>
      </div>
    );
  }
}
