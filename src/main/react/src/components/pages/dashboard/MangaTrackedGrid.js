import React, {useState, useEffect} from "react";
import AlertC from "../../shared/AlertC";

import {Link} from "react-router-dom";
import {MangaTracked} from "./MangaTracked";

export const MangaTrackedGrid = ({mangas, lastFetchInformations}) => {
    const [mangasTracked, setMangaTracked] = useState(mangas);

    const updateMangas = updatedManga => {
        // delete then add in the array
        const updatedMangas = mangasTracked.filter(manga => manga.mangaTrackedId !== updatedManga.mangaTrackedId);
        setMangaTracked([...updatedMangas, updatedManga]);
    };

    useEffect(() => {
    }, []);

    return mangas.length === 0 ? (
        <div>
            <p>
                Aucun manga suivi ! Commencez par en{" "}
                <Link to="/search-manga">suivre</Link> quelques-un.
            </p>
        </div>
    ) : (
        <>
            <hr className="hr-separator"/>
            <div className="row row-eq-height">
                {mangasTracked.map((manga, index) =>
                    <MangaTracked
                        key={index}
                        manga={manga}
                        updateMangas={updateMangas}
                        lastFetchInformations={lastFetchInformations}
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
