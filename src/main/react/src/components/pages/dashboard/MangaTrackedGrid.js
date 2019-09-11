import React, {useState} from "react";
import AlertC from "../../shared/AlertC";

import {Link} from "react-router-dom";
import {MangaTracked} from "./MangaTracked";

export const MangaTrackedGrid = ({mangas}) => {
    const [alertContent, setAlertContent] = useState(null);

    const updateAlert = param => {
        setAlertContent(param);
        setInterval(() => setAlertContent(null), 5000);
    };


    return mangas.length === 0 ? (
        <div>
            <p>
                Aucun manga suivi ! Commencez par en{" "}
                <Link to="/search-manga">suivre</Link> quelques-un.
            </p>
        </div>
    ) : (
        <>
            <AlertC information={alertContent}/>
            <hr className="hr-separator"/>
            <div className="row row-eq-height">
                {mangas.map((manga, index) =>
                    <MangaTracked
                        key={index}
                        manga={manga}
                        updateAlertInformation={updateAlert}
                    />
                )}
                <div className="col-lg-2 col-sm-3 col-4 col-manga col-icone-plus">
                    <Link to="/search-manga" className="icone-plus hover-white">
                        <i className="fas fa-plus-circle fa-3x"/>
                    </Link>
                </div>
            </div>
        </>
    );
};
