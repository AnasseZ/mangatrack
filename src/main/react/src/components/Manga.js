import React from "react";
import { getMangaTracked } from "../services/MangaService";
import MangaModal from "../components/modals/MangaModal";

export default class Manga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      mangaTracked: {},
      isLoaded: false,
      error: null,
      mangaEntity: {},
      isPushed: false,
      imgErrors: 0
    };
  }

  choseMangaOk = result => {
    this.setState({
      isLoaded: true,
      mangaTracked: result
    });
  };

  choseMangaError = error => {
    this.setState({
      isLoaded: true,
      error: error
    });
  };

  choseManga = () => {
    getMangaTracked(
      this.props.manga.href,
      this.choseMangaOk,
      this.choseMangaError
    );

    this.updateModal();
  };

  addDefaultSrc = ev => {
    if (this.state.imgErrors === 0) {
      ev.target.src = this.props.manga.img;
      this.setState({
        imgErrors: this.state.imgErrors + 1
      });
    } else {
      ev.target.src = "/robot-error-codes.png";
    }
  };

  updateModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { manga } = this.props;

    const mangaTitle =
      manga.title.length > 30
        ? manga.title.substring(0, 30) + "..."
        : manga.title;

    return (
      <div className="col-lg-2 col-sm-3 col-4 col-manga">
        <div className="card border-0 card-manga">
          <img
            className="card-img-top"
            src={manga.imgFixed}
            alt="Manga cover"
            onClick={this.choseManga}
            onError={this.addDefaultSrc}
          />
          <div className="card-body">
            <h5 className="card-title">{mangaTitle}</h5>
          </div>
        </div>
        <MangaModal
          isOpen={this.state.modal}
          toggle={this.choseManga}
          className={this.props.choseManga}
          toggleHeader={this.toggle}
          mangaTracked={this.state.mangaTracked}
          manga={this.props.manga}
          mangaTitle={manga.title}
          token={this.props.token}
          updateModal={this.updateModal}
          callBackAlert={this.props.callback}
          user={this.props.user}
        />
      </div>
    );
  }
}
