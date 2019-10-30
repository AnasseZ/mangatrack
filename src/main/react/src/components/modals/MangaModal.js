import React, {useState, useEffect} from "react";

import {createMangaTrackedFromManga} from "../../util/format";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input
} from "reactstrap";
import {getUpdatedInformations, postMangaTracked} from "../../services/MangaService";
import {addSuccessNotification, addErrorNotification} from "../../util/notification";

export const MangaModal = ({isOpen, toggle, manga, mangaTitle}) => {

    const [lastChapterRead, setLastChapterRead] = useState("");

    const onChangeLastChapterRead = e => setLastChapterRead(e.target.value);

    const followManga = () => {
        postMangaTracked(
            createMangaTrackedFromManga(manga, lastChapterRead),
            result => addSuccessNotification("Bravo ! Vous suivez maintenant " + manga.title + "."),
            error => addErrorNotification("Erreur ! Vous n'avez pas pu suivre " + manga.title + "."),
            true
        );
        toggle();
    };

    const syncLastChapterRead = () => {
        setLastChapterRead(manga.lastChapterOut);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-manga">
            <ModalHeader toggle={toggle} className="modal-title">
                Suivre ce manga ?
            </ModalHeader>
            <ModalBody>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <img
                                className="img-modal"
                                src={manga.imgSrc}
                                alt="Manga cover"
                            />
                        </div>
                        <div className="col-sm-8">
                            <h2 className="manga-title">{mangaTitle}</h2>
                            <h3 className="chap-title">
                                Dernier chapitre: {manga.lastChapterOut}
                            </h3>
                            <br/>
                            <h6 className="grey subtitle-input">Facultatif</h6>
                            <div className="row">
                                <div className="col-sm-8 col-9">
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            name="lastChapterRead"
                                            id="lastChapterRead"
                                            placeholder="Dernier chapitre lu"
                                            onChange={onChangeLastChapterRead}
                                            value={lastChapterRead}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-4 col-3">
                                    <Button color="secondary" onClick={syncLastChapterRead}>
                                        <i className="fas fa-sync-alt"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Annuler
                </Button>
                <Button color="primary" onClick={followManga}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
};
