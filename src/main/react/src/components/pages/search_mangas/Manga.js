import React, {useState} from "react";
import {MangaModal} from "../../modals/MangaModal";
import {getTitle} from "../../../util/format";

export const Manga = ({manga, callback}) => {

    const [toggleModal, setToggleModal] = useState(false);

    // ensure to call the api only one time and only when user click on it
    const [showModalOnce, setShowModalOnce] = useState(false);

    const mangaTitle = getTitle(manga.title);

    const updateModalState = () => {
        setToggleModal(!toggleModal);

        if (!showModalOnce) {
            setShowModalOnce(true);
        }
    };

    return (
        <div className="col-lg-2 col-sm-3 col-4 col-manga">
            <div className="card border-0 card-manga">
                <img
                    className="card-img-top"
                    src={manga.imgSrc}
                    alt="Manga cover"
                    onClick={updateModalState}
                />
                <div className="card-body">
                    <h5 className="card-title">{mangaTitle}</h5>
                </div>
            </div>
            {
                showModalOnce && <MangaModal
                    isOpen={toggleModal}
                    toggle={updateModalState}
                    manga={manga}
                    mangaTitle={manga.title}
                    callBackAlert={callback}
                />
            }
        </div>
    );
};
