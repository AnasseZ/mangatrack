import React, {useState, useEffect} from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input
} from "reactstrap";
import {postManga} from "../../services/MangaService";

export const MangaModal = ({isOpen, toggle, manga, mangaTitle, callBackAlert}) => {

    const [lastChapterRead, setLastChapterRead] = useState("");

    useEffect(() => {
        setLastChapterRead("687");
    }, []);

    const sendAlertContent = param => {
        callBackAlert(param);
    };

    const sendSuccessAlert = () => {
        return {
            content: "Bravo ! Vous suivez maintenant " + manga.title + ".",
            class: "info"
        };
    };

    const sendErrorAlert = () => {
        return {
            content:
                "Erreur ! Vous n'avez pas pu suivre " + manga.title + ".",
            class: "danger"
        };
    };

    const followOk = result => {
        sendAlertContent(sendSuccessAlert());
    };

    const followError = error => {
        sendAlertContent(sendErrorAlert());
    };

    const onChangeLastChapterRead = e => setLastChapterRead(e.target.value);

    const followManga = () => {
        console.log(manga);
        //postManga(manga, followOk, followError, true);
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
