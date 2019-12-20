import React, {useEffect, useState} from "react";
import {getMangaTracked} from "../../../services/MangaService";
import Loading from "../loading/Loading";


export default ({match, history}) => {

    const id = match.params.id;
    const [mangaTracked, setMangaTracked] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            getMangaTracked(
                id,
                mangaTracked => {
                    setMangaTracked(mangaTracked);
                    setLoading(false);
                },
                () => {
                    history.push('/');
                }
            )
        }
        , []
    );

    if (loading) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    const manga = mangaTracked.manga;

    return (
        <>
            <div className="container container-detail mt-5">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 col-md-6 col-12">
                        <img
                            className="img-detail shadow-lg rounded-1"
                            src={manga.imgSrc}
                            alt="Miniature manga"
                        />
                    </div>
                    <div className="col-sm-6 col-lg-8 col-md-6 col-12 text-left col-detail">
                        <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                                <h1 className="detail-mangaTitle">{manga.title}</h1>
                                <h4 className="detail-mangaAuthor">{manga.author}</h4>
                            </div>
                            <div className="manga-detail-form">
                                <div className="form-group d-flex">
                                    <p className="col-sm-4 col-6 ">Parution :</p>
                                    <p className="font-weight-bold col-6">{manga.finished ? "Terminé" : "En cours"}</p>
                                </div>
                                <div className="form-group d-flex">
                                    <p className="col-sm-4 col-6">Dernier chapitre sortie :</p>
                                    <p className="font-weight-bold col-6">{manga.lastChapterOut}</p>
                                </div>
                                <div className="form-group d-flex">
                                    <label className=" col-form-label col-sm-4 col-6">Dernier chapitre lu :</label>
                                    <input
                                        type="number"
                                        className="form-control w-auto mb-1 col-6"
                                        placeholder="Mis à jours"
                                        value={mangaTracked.lastChapterRead}
                                        onChange={() => {}}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-form-label col-sm-4 col-6" htmlFor="selectCategory">Statut
                                        :</label>
                                    <select className="form-control w-auto col-6" id="selectCategory">
                                        <option>En cours</option>
                                        <option>Terminé</option>
                                        <option>A lire</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end row-detail-follow">
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => {}}
                                >
                                    Ne plus suivre
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success ml-2"
                                    onClick={() => {}}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};