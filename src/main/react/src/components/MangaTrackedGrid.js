import React from "react";
import MangaTracked from "./MangaTracked";
import { AuthConsumer } from "../contexts/AuthContext";
import AlertC from "../components/AlertC";

import { Link } from "react-router-dom";

export default class MangaTrackedGrid extends React.Component {
  state = {
    alertContent: null
  };

  setAlertContent = param => {
    this.setState({
      alertContent: param
    });

    setInterval(
      () =>
        this.setState({
          alertContent: null
        }),
      10000
    );
  };

  render() {
    const mangas = this.props.mangas;

    return mangas.length === 0 ? (
      <div>
        <p>
          Aucun manga suivi ! Commencez par en{" "}
          <Link to="/search-manga">suivre</Link> quelques-un.
        </p>
      </div>
    ) : (
      <>
        <AlertC information={this.state.alertContent} />
        <hr className="hr-separator" />
        <div className="row row-eq-height">
          {mangas.map((manga, index) => {
            return (
              <AuthConsumer key={index}>
                {({ apiRoot, token, user }) => (
                  <MangaTracked
                    manga={manga}
                    token={token}
                    user={user}
                    updateAlertInformation={this.setAlertContent}
                  />
                )}
              </AuthConsumer>
            );
          })}
          <div className="col-lg-2 col-sm-3 col-4 col-manga col-icone-plus">
            <Link to="/search-manga" className="icone-plus hover-white">
              <i className="fas fa-plus-circle fa-3x" />
            </Link>
          </div>
        </div>
      </>
    );
  }
}
