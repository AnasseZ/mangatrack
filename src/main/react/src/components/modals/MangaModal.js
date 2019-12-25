import React, {useState, useEffect} from "react";

import {createMangaTrackedFromManga} from "../../util/format";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import {getUpdatedInformations, postMangaTracked} from "../../services/MangaService";
import {addSuccessNotification, addErrorNotification} from "../../util/notification";
import {frenchStatusList, ON_GOING} from "../../constantes/mangaStatus";

export const MangaModal = ({isOpen, toggle, manga, mangaTitle, mangasStatus}) => {

    const initialStatus =  mangasStatus.find(status => status.status === ON_GOING);

    const [lastChapterRead, setLastChapterRead] = useState("");
    const [selectedStatusId, setSelectedStatusId] = useState(initialStatus.id);

    const onChangeLastChapterRead = e => setLastChapterRead(e.target.value);

    const followManga = () => {
        // == because different type ....
        const chosedStatus = mangasStatus.find(status => status.id == selectedStatusId);

        postMangaTracked(
            createMangaTrackedFromManga(manga, lastChapterRead, chosedStatus),
            result => addSuccessNotification("Bravo ! Vous suivez maintenant " + manga.title + "."),
            error => addErrorNotification("Erreur ! Vous n'avez pas pu suivre " + manga.title + "."),
            true
        );
        toggle();
    };

    const syncLastChapterRead = () => {
        setLastChapterRead(manga.lastChapterOut);
    };

    const handleStatusChange = e => {
        setSelectedStatusId(e.target.value);
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
                                    <FormGroup>
                                        <Label className="grey subtitle-input" for="selectStatus">Select</Label>
                                        <select value={selectedStatusId} name="selectStatus" className="form-control" id="selectStatus" onChange={handleStatusChange}>
                                            {
                                                mangasStatus.map((status, key) => {
                                                    return <option value={status.id} key={key}>{frenchStatusList[status.status]}</option>

                                                })
                                            }
                                        </select>
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
