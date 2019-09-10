import React, {useState, useEffect} from "react";
import {getMangaInformations} from "../../../services/MangaService";
import MangaModal from "../../modals/MangaModal";
import {mangadexImgRoot} from "../../../constantes/apiInformations";
import {getTitle} from "../../../util/format";

export const Manga = ({manga, callback, user, token}) => {

    const [modal, setModal] = useState(false);
    const [mangaTracked, setMangaTracked] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [mangaEntity, setMangaEntity] = useState({});
    const [isPushed, setIsPushed] = useState(false);
    const [imgErrors, setImgErrors] = useState(0);

    const choseMangaOk = result => {
        setIsLoaded(true);
        setMangaTracked(result);
        console.log(mangaTracked);
    };

    const choseMangaError = error => {
        setIsLoaded(true);
        setError(error);
    };

    useEffect(() => getMangaInformations(
        manga.id,
        choseMangaOk,
        choseMangaError
        ), []
    );

    const addDefaultSrc = ev => {
        if (imgErrors === 0) {
            ev.target.src = mangadexImgRoot + mangaTracked.cover_url;
            setImgErrors(imgErrors +1);
        } else {
            ev.target.src = "/robot-error-codes.png";
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const mangaTitle = getTitle(manga.title);

    return (
        <div className="col-lg-2 col-sm-3 col-4 col-manga">
            <div className="card border-0 card-manga">
                <img
                    className="card-img-top"
                    src={manga.imgFixed}
                    alt="Manga cover"
                    onClick={toggleModal}
                    onError={addDefaultSrc}
                />
                <div className="card-body">
                    <h5 className="card-title">{mangaTitle}</h5>
                </div>
            </div>
            <MangaModal
                isOpen={modal}
                toggle={toggleModal}
                className={"manga-mod"}
                toggleHeader={toggleModal}
                mangaTracked={mangaTracked}
                manga={manga}
                mangaTitle={manga.title}
                token={token}
                updateModal={toggleModal}
                callBackAlert={callback}
                user={user}
            />
        </div>
    );
}
