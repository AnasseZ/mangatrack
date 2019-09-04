import React from "react";
import MangasGrid from "./MangasGrid";
import { AuthConsumer } from "../contexts/AuthContext";

export class FindManga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      load: false,
      manga: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    this.setState({
      load: true,
      manga: this.state.value
    });
  };

  handleChange(evt) {
    this.setState({
      load: false,
      value: evt.target.value
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="col-8 col-sm-4">
            <input
              value={this.state.value}
              type="text"
              className="form-control"
              id="mangaSearch"
              placeholder="Chercher un manga"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-4 col-sm-2 text-left pl-0">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleClick}
              id="btnSubManga"
              disabled={!this.state.value}
            >
              Chercher
            </button>
          </div>
        </div>
        <br />
        <br />
        <AuthConsumer>
          {({ apiRoot }) =>
            this.state.load ? (
              <MangasGrid mangaSearched={this.state.manga} apiRoot={apiRoot} />
            ) : (
              ""
            )
          }
        </AuthConsumer>
      </React.Fragment>
    );
  }
}
