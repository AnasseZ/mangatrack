import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from "reactstrap";
import { postManga } from "../../services/MangaService";

export default class MangaModal extends React.Component {
  
    state = {
        lastChapterRead: "" 
    };
    
  sendAlertContent = param => {
    this.props.callBackAlert(param);
  };

  sendSuccessAlert = () => {
    return {
      content: "Bravo ! Vous suivez maintenant " + this.props.manga.title + ".",
      class: "info"
    };
  };

  sendErrorAlert = () => {
    return {
      content:
        "Erreur ! Vous n'avez pas pu suivre " + this.props.manga.title + ".",
      class: "danger"
    };
  };

  followOk = result => {
    this.setState({
      isPushed: true,
      mangaEntity: result
    });
    this.sendAlertContent(this.sendSuccessAlert());
  };

  followError = error => {
    this.setState({
      isPushed: true,
      error: error
    });
    this.sendAlertContent(this.sendErrorAlert());
  };

  onChangeLastChapterRead = e =>
    this.setState({ lastChapterRead: e.target.value });

  followManga = () => {
    const { manga } = this.props;
    const { mangaTracked } = this.props;
    let mangaSend = {
      title: manga.title,
      imgUrl: manga.img,
      imgFixedUrl: manga.imgFixed,
      mangadexUrl: mangaTracked.url,
      currentChapter: this.state.lastChapterRead,
      lastChapterOut: mangaTracked.chapterNumber,
      user: this.props.user["@id"],
      sinceChapterOut: mangaTracked.sinceChapterOut,
      author: mangaTracked.author
    };

    console.log(mangaSend);
    postManga(mangaSend, this.followOk, this.followError, this.props.token);
    this.props.updateModal();
  };

  syncLastChapterRead = () => {
      console.log(this.props.mangaTracked.chapterNumber);
    this.setState({
      lastChapterRead: this.props.mangaTracked.chapterNumber
    });
  };

  render() {
    const {
      isOpen,
      toggle,
      className,
      toggleHeader,
      mangaTracked,
      mangaTitle,
      updateModal
    } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggleHeader} className="modal-title">
          Suivre ce manga ?
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <img
                  className="img-modal"
                  src={mangaTracked.imgSrc}
                  alt="Manga cover"
                />
              </div>
              <div className="col-sm-8">
                <h2 className="manga-title">{mangaTitle}</h2>
                <h3 className="chap-title">
                  Dernier chapitre: {mangaTracked.chapterNumber}
                </h3>
                <br />
                <h6 className="grey subtitle-input">Facultatif</h6>
                <div className="row">
                  <div className="col-sm-8 col-9">
                    <FormGroup>
                      <Input
                        type="number"
                        name="lastChapterRead"
                        id="lastChapterRead"
                        placeholder="Dernier chapitre lu"
                        onChange={this.onChangeLastChapterRead}
                        value={this.state.lastChapterRead}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-sm-4 col-3">
                    <Button color="secondary" onClick={this.syncLastChapterRead}>
                      <i className="fas fa-sync-alt" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={updateModal}>
            Annuler
          </Button>
          <Button color="primary" onClick={this.followManga}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
