import React, {useEffect, useState} from "react";
import {getMangasStatusList, getMangaTracked, updateMangaTracked} from "../../../services/MangaService";
import Loading from "../loading/Loading";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";
import {frenchStatusList} from "../../../constantes/mangaStatus";


export default ({match, history}) => {

    const id = match.params.id;
    const [mangaTracked, setMangaTracked] = useState(null);
    const [immutableMangaTracked, setImmutableMangaTracked] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [mangaStatusList, setMangaStatusList] = useState(null);

    useEffect(() => {
            getMangaTracked(
                id,
                result => {
                    setMangaTracked(result);
                    setImmutableMangaTracked(result);
                    setLoading(false);
                },
                () => {
                    history.push('/');
                }
            )
        }
        , []
    );

    // after mangatracked is fetched
    useEffect(() => {
        getMangasStatusList(statusList => {
                setMangaStatusList(statusList);
                setLoadingStatus(false);
            },
            null
        );
    }, [immutableMangaTracked]);

    const onChangeField = e => {
        setMangaTracked({
            ...mangaTracked,
            [e.target.name]: e.target.value
        });
    };

    const onChangeSelect = e => {
        setMangaTracked({
            ...mangaTracked,
            [e.target.name]: mangaStatusList.find(status => status.id == e.target.value)
        });
    };

    const update = () => {
        if (immutableMangaTracked.lastChapterRead !== mangaTracked.lastChapterRead
            || immutableMangaTracked.mangaStatus.id !== mangaTracked.mangaStatus.id
        ) {
            updateMangaTracked(
                mangaTracked,
                () => addSuccessNotification(mangaTracked.manga.title + " est mis à jour."),
                () => addErrorNotification("Erreur ! Vous n'avez pas pu mettre à jour " + mangaTracked.manga.title + ".")
            );
        }
    };

    if (loading || loadingStatus) {
        return <Loading/>;
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
                                        name="lastChapterRead"
                                        value={mangaTracked.lastChapterRead}
                                        onChange={onChangeField}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-form-label col-sm-4 col-6" htmlFor="selectCategory">
                                        Avancement :
                                    </label>
                                    <select className="form-control w-auto col-6" id="selectCategory"
                                            value={mangaTracked.mangaStatus.id} name="mangaStatus"
                                            onChange={onChangeSelect}>
                                        {
                                            mangaStatusList.map((status, index) =>
                                                <option key={index} value={status.id}>{frenchStatusList[status.status]}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end row-detail-follow">
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => {
                                    }}
                                >
                                    Ne plus suivre
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success ml-2"
                                    onClick={update}
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