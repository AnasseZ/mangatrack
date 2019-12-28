import React from "react";
import {GridItem} from "./GridItem";
import {Link} from "react-router-dom";

export const CategoryGrid = ({mangasTracked, updateMangas, title}) => {

    let subTitle = '';

    if (mangasTracked.length === 1) {
        subTitle = " - " + mangasTracked.length + " manga";
    }

    if (mangasTracked.length > 1) {
        subTitle = " - " + mangasTracked.length + " mangas";
    }

    return (
        <>
            <div>
                <h4 className="text-left">{title} <span className="titleNbManga"> {subTitle}</span></h4>
                <hr className="hr-separator mt-1"/>
                <div className="d-flex overflow-auto">
                    {mangasTracked.map((mangaTracked, index) =>
                        <GridItem
                            key={index}
                            mangaTracked={mangaTracked}
                            updateMangas={updateMangas}
                        />
                    )}
                    {
                        mangasTracked.length > 0 ?
                            <div className="col-lg-2 col-sm-3 col-6 col-manga scale-on-hover col-icone-plus">
                                <Link to="/search-manga" className="icone-plus hover-white">
                                    <i className="fas fa-plus-circle fa-3x"/>
                                </Link>
                            </div>
                            : ''
                    }

                    {
                        mangasTracked.length === 0 ?
                            <div className="col-sm-12 font-italic text-left">
                                <h6>Aucun manga pour le moment.</h6>
                            </div>
                            : ''
                    }
                </div>
            </div>
            <br/>
        </>
    )
};