import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";
import {MangaTracked} from "./MangaTracked";
import {getMangasTracked} from "../../../services/MangaService";
import Loading from "../loading/Loading";

export const MangaTrackedGrid = () => {
    const [mangasTracked, setMangasTracked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateMangas = updatedManga => {
        // delete then add in the array
        const updatedMangas = mangasTracked.filter(manga => manga.id !== updatedManga.id);
        const sortedMangas = [...updatedMangas, updatedManga]
            .sort((m1, m2) => m1.manga.mangaTrackedId - m2.manga.mangaTrackedId);
        setMangasTracked(sortedMangas);
    };

    useEffect(() => {
        getMangasTracked(
            result => {
                if(result.length > 0 ) {
                    const sortedMangas = result.sort((m1, m2) => m1.manga.mangaTrackedId - m2.manga.mangaTrackedId);
                    setMangasTracked(sortedMangas)
                }
;
                setLoading(false);
            },
            error => {
                setLoading(false);
                setError(error);
            }
        );
    }, []);


    if (loading) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    return mangasTracked.length === 0 ? (
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
                {mangasTracked.map((mangaTracked, index) =>
                    <MangaTracked
                        key={index}
                        mangaTracked={mangaTracked}
                        updateMangas={updateMangas}
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
