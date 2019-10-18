import React, {useState, useEffect} from "react";

import {
    getMangaTrackedUpdatedInformations,
    updateLastChapterRead
} from "../../../services/MangaService";
import {getTitle} from "../../../util/format";
import {mangadexMangaRoot} from "../../../constantes/apiInformations";
import {canFetchUpdatedInformations} from "../../../util/validation";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";

export const MangaTracked = ({manga, updateMangas, lastFetchInformations}) => {
    const [error, setError] = useState(null);
    const [wantModify, setWantModify] = useState(false);
    const [updatedChapterRead, setUpdatedChapterRead] = useState(manga.lastChapterRead);

    useEffect(() => {
        if (!manga.isFinished && canFetchUpdatedInformations(lastFetchInformations)) {
            getMangaTrackedUpdatedInformations(
                manga.mangaTrackedId,
                result => {
                    updateMangas(result);
                },
                error => setError(error),
                true
            );
        }
    }, []);

    const updateMangaTracked = () => {
        if (manga.lastChapterRead !== updatedChapterRead) {
            updateLastChapterRead(
                {...manga, lastChapterRead: updatedChapterRead},
                updateMangaOk,
                updateMangaError,
                true
            );
        } else {
            // simule une annulation de vouloir modifier
            updateWantModify();
        }
    };

    const updateMangaOk = result => {
        updateMangas(result);
        addSuccessNotification(manga.title + " est mis à jour.");
        updateWantModify();
    };

    const updateMangaError = error => {
        setError(error);
        addErrorNotification("Erreur ! Vous n'avez pas pu mettre à jour " + manga.title + ".");
        updateWantModify();
    };

    const updateWantModify = () => setWantModify(!wantModify);

    const onChangeUpdatedChapterRead = e => setUpdatedChapterRead(e.target.value);

    const mangaTitle = getTitle(manga.title);
    const mangadexUrl = mangadexMangaRoot + manga.mangaTrackedId;

    return (
        <div className="col-lg-2 col-sm-3 col-4 col-manga">
            <div className="card border-0 shadow-lg">
                <img
                    className="card-img-top"
                    src={manga.imgSrc}
                    alt="Miniature manga"
                />
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{mangaTitle}</h5>
                        <p className="card-text">
                            Chapitre {manga.lastChapterOut}{" "}
                            <a href={mangadexUrl} className="bisque">
                                <i className="far fa-arrow-alt-circle-right"/>
                            </a>
                        </p>
                        {wantModify ? (
                            <p className="mb-0">
                                Dernier lu: <strong>{manga.lastChapterRead}</strong>
                            </p>
                        ) : manga.lastChapterOut === manga.lastChapterRead ? (
                            <p className="card-text is-up-to-date">À jour !</p>
                        ) : (
                            <p className="card-text">
                                Dernier lu: <strong>{manga.lastChapterRead}</strong>
                            </p>
                        )}
                    </div>
                    {wantModify ? (
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Mis à jours"
                                value={updatedChapterRead}
                                onChange={onChangeUpdatedChapterRead}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    id="button-addon2"
                                    onClick={updateMangaTracked}
                                >
                                    <i className="fas fa-check"/>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="row-edit mb-2">
                            <i
                                className="fas fa-edit float-right edit-icon hover-white grey"
                                onClick={updateWantModify}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
