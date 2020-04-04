import React, {useState, useEffect, useRef} from "react";

import {
    getMangaTrackedUpdatedInformations,
    updateMangaTracked
} from "../../../services/MangaService";
import {getTitle} from "../../../util/format";
import {mangadexMangaRoot} from "../../../constantes/apiInformations";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";
import {Link} from "react-router-dom";
import {IMG_RATIO} from "../../../constantes/utils";

export const GridItem = ({mangaTracked, updateMangas}) => {
    const [error, setError] = useState(null);
    const [wantModify, setWantModify] = useState(false);
    const [updatedChapterRead, setUpdatedChapterRead] = useState(mangaTracked.lastChapterRead);

    const imgRef = useRef(null);

    const [imgHeight, setImgHeight] = useState(0);

    useEffect(() => {
        const width = imgRef.current ? imgRef.current.offsetWidth : 0;
        setImgHeight(width * IMG_RATIO);
    }, [imgRef.current]);

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

    const manga = mangaTracked.manga;
    const mangaTitle = getTitle(manga.title);
    const mangadexUrl = mangadexMangaRoot + manga.mangaTrackedId;

    return (
        <div className="col-lg-2 col-sm-3 col-6 col-manga">
            <div className="card border-0 shadow card-manga">
                <Link to={"/mangas/" + mangaTracked.id}>
                    <img
                        ref={imgRef}
                        className="card-img-top"
                        src={manga.imgSrc}
                        alt="Miniature manga"
                        height={imgHeight}
                    />
                </Link>
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{mangaTitle}</h5>
                        <p className="card-text mb-0">
                            Chapitre {manga.lastChapterOut}{" "}
                            <a href={mangadexUrl} className="bisque">
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
                                <p className="mb-0">
                                    Dernier lu: <strong>{mangaTracked.lastChapterRead}</strong>
                                </p>
                            )}

                            {wantModify ? (
                                ""
                            ) : (
                                <div className="updateMangaIconwrapper cursor-pointer">
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
    );
};
