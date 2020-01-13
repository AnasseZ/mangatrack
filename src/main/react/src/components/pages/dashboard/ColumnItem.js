import React, {useState, useEffect} from 'react';
import {getReducedText} from "../../../util/format";
import {mangadexMangaRoot} from "../../../constantes/apiInformations";
import {updateMangaTracked} from "../../../services/MangaService";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";
import {Link} from "react-router-dom";
import {Draggable} from "react-beautiful-dnd";

export const ColumnItem = ({mangaTracked, updateMangas, index}) => {

    const [error, setError] = useState(null);
    const [wantModify, setWantModify] = useState(false);
    const [updatedChapterRead, setUpdatedChapterRead] = useState(mangaTracked.lastChapterRead);

    useEffect(() => {
        if (!mangaTracked.manga.isFinished) {/*
            getMangaTrackedUpdatedInformations(
                mangaTracked.manga.mangaTrackedId,
                result => {
                    updateMangas(result);
                },
                error => setError(error),
                true
            );*/
        }
    }, []);

    const update = () => {
        if (mangaTracked.lastChapterRead !== updatedChapterRead) {
            updateMangaTracked(
                {...mangaTracked, lastChapterRead: updatedChapterRead},
                updateMangaOk,
                updateMangaError
            );
        } else {
            // simule une annulation de vouloir modifier
            updateWantModify();
        }
    };

    const updateMangaOk = result => {
        updateMangas(result);
        addSuccessNotification(mangaTracked.manga.title + " est mis à jour.");
        updateWantModify();
    };

    const updateMangaError = error => {
        setError(error);
        addErrorNotification("Erreur ! Vous n'avez pas pu mettre à jour " + mangaTracked.manga.title + ".");
        updateWantModify();
    };

    const updateWantModify = () => setWantModify(!wantModify);

    const onChangeUpdatedChapterRead = e => setUpdatedChapterRead(e.target.value);

    const {manga} = mangaTracked;
    const mangadexUrl = mangadexMangaRoot + manga.mangaTrackedId;

    return (
        <Draggable draggableId={mangaTracked.id.toString()} index={index}>
            {
                (provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps}
                         ref={provided.innerRef}>
                        <div className="list-card">
                            <div className="row p-2 m-0 text-left">
                                <div className="col-auto pl-0">
                                    <Link to={"/mangas/" + mangaTracked.id}>
                                        <img src={manga.imgSrc} className="img-column-item shadow" alt="Cover"/>
                                    </Link>
                                </div>
                                <div className="col px-0">
                                    <p className="text-dark font-weight-bold mb-0">
                                        {getReducedText(manga.title, 15)} {mangaTracked.position}
                                    </p>
                                    <p className="text-dark mb-2">
                                        Chapitre {manga.lastChapterOut}{" "}
                                        <a href={mangadexUrl} className="text-blue">
                                            <i className="far fa-arrow-alt-circle-right"/>
                                        </a>
                                    </p>
                                    <div className="w-100 d-flex justify-content-between">
                                        {wantModify ? (
                                            <div className="input-group input-group-sm">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Mis à jours"
                                                    value={updatedChapterRead}
                                                    onChange={onChangeUpdatedChapterRead}
                                                    min="0"
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-outline-success"
                                                        type="button"
                                                        id="button-addon2"
                                                        onClick={update}
                                                    >
                                                        <i className="fas fa-check"/>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : manga.lastChapterOut === mangaTracked.lastChapterRead ? (
                                            <p className="text-blue font-weight-bold mb-0">À jour !</p>
                                        ) : (
                                            <p className="text-dark mb-0">
                                                Dernier lu: <strong>{mangaTracked.lastChapterRead}</strong>
                                            </p>
                                        )}

                                        {wantModify ? (
                                            ""
                                        ) : (
                                            <div className="">
                                                <i
                                                    className="fas fa-edit updateMangaIcon"
                                                    onClick={updateWantModify}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
};


