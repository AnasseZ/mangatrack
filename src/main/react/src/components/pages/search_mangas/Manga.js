import React, {useState, useEffect, useRef} from "react";
import {MangaModal} from "../../modals/MangaModal";
import {getTitle} from "../../../util/format";
import {IMG_RATIO} from "../../../constantes/utils";

export const Manga = ({manga, mangasStatus}) => {

    const [toggleModal, setToggleModal] = useState(false);

    // ensure to call the api only one time and only when user click on it
    const [showModalOnce, setShowModalOnce] = useState(false);

    const imgRef = useRef(null);

    const [imgHeight, setImgHeight] = useState(0);

    useEffect(() => {
        const width = imgRef.current ? imgRef.current.offsetWidth : 0;
        setImgHeight(width * IMG_RATIO);
    }, [imgRef.current]);

    const mangaTitle = getTitle(manga.title);

    const updateModalState = () => {
        setToggleModal(!toggleModal);

        if (!showModalOnce) {
            setShowModalOnce(true);
        }
    };

    return (
        <div className="col-lg-2 col-sm-3 col-4 col-manga scale-on-hover">
            <div className="card border-0 card-manga">
                <img
                    ref={imgRef}
                    className="card-img-top"
                    src={manga.imgSrc}
                    alt="Manga cover"
                    onClick={updateModalState}
                    height={imgHeight}
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
                    mangasStatus={mangasStatus}
                />
            }
        </div>
    );
};
