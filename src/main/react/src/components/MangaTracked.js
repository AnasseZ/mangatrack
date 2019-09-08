import React from "react";

import { updateManga } from "../services/MangaService";

export default class MangaTracked extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgErrors: 0,
      manga: this.props.manga,
      error: null,
      isUpdated: false,
      wantModify: false,
      updatedChapterNumber: this.props.manga.currentChapter
    };
  }

  sendAlertContent = param => {
    this.props.updateAlertInformation(param);
  };

  sendSuccessAlert = () => {
    return {
      content: this.props.manga.title + " est mis à jour.",
      class: "info"
    };
  };

  sendErrorAlert = () => {
    return {
      content:
        "Erreur ! Vous n'avez pas pu mettre à jour " +
        this.props.manga.title +
        ".",
      class: "danger"
    };
  };

  addDefaultSrc(ev) {
    if (this.state.imgErrors === 0) {
      ev.target.src = this.props.manga.img;
      this.setState({
        imgErrors: this.state.imgErrors + 1
      });
    } else {
      ev.target.src = "/robot-error-codes.png";
    }
  }

  updateMangaTracked = () => {
    let { manga } = this.state;
    if (manga.currentChapter !== this.state.updatedChapterNumber) {
      manga.currentChapter = this.state.updatedChapterNumber;

      updateManga(
        manga,
        this.updateMangaOk,
        this.updateMangaError,
        this.props.token
      );
    } else {
      // simule une annulation de vouloir modifier
      this.updateWantModify();
    }
  };

  updateMangaOk = result => {
    this.setState({
      manga: result,
      isUpdated: true
    });

    this.sendAlertContent(this.sendSuccessAlert());
    this.updateWantModify();
  };

  updateMangaError = error => {
    this.setState({
      error: error,
      isUpdated: true
    });

    this.sendAlertContent(this.sendErrorAlert());
    this.updateWantModify();
  };

  updateWantModify = () =>
    this.setState({ wantModify: !this.state.wantModify });

  onChangeUpdatedChapterNumber = e => {
    this.setState({ updatedChapterNumber: e.target.value });
  };

  render() {
    const { manga } = this.state;

    const mangaTitle =
      manga.title.length > 30
        ? manga.title.substring(0, 30) + "..."
        : manga.title;

    return (
      <div className="col-lg-2 col-sm-3 col-4 col-manga">
        <div className="card border-0 shadow-lg">
          <img
            className="card-img-top"
            src={manga.imgFixedUrl}
            alt="Miniature manga"
            onError={this.addDefaultSrc}
          />
          <div className="card-body d-flex justify-content-between">
            <div>
              <h5 className="card-title">{mangaTitle}</h5>
              <p className="card-text">
                Chapitre {manga.lastChapterOut}{" "}
                <a href={manga.mangadexUrl} className="bisque">
                  <i className="far fa-arrow-alt-circle-right" />
                </a>
              </p>
              {this.state.wantModify ? (
                <p className="mb-0">
                  Dernier lu: <strong>{manga.currentChapter}</strong>
                </p>
              ) : manga.lastChapterOut === manga.currentChapter ? (
                <p className="card-text is-up-to-date">À jour !</p>
              ) : (
                <p className="card-text">
                  Dernier lu: <strong>{manga.currentChapter}</strong>
                </p>
              )}
            </div>
            {this.state.wantModify ? (
              <div className="input-group input-group-sm mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mis à jours"
                  value={this.state.updatedChapterNumber}
                  onChange={this.onChangeUpdatedChapterNumber}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={this.updateMangaTracked}
                  >
                    <i className="fas fa-edit" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="row-edit mb-2">
                <i
                  className="fas fa-edit float-right edit-icon hover-white grey"
                  onClick={this.updateWantModify}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
