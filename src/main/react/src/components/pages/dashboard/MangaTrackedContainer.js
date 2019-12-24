import React, {useState, useEffect} from "react";

import {getMangasTracked} from "../../../services/MangaService";
import {COMPLETED, ON_GOING, TO_READ} from "../../../constantes/mangaStatus";
import Loading from "../loading/Loading";
import {Link} from "react-router-dom";
import {GridSystem} from "./GridSystem";
import {ColumnSystem} from "./ColumnSystem";

export const MangaTrackedContainer = ({gridMode, updateGridMode}) => {

    const [mangasTracked, setMangasTracked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** MANGAS FILTER BY STATUS */
    const [toReadMangas, setToReadMangas] = useState([]);
    const [onGoingMangas, setOnGoingMangas] = useState([]);
    const [completedMangas, setCompletedMangas] = useState([]);


    const updateMangas = updatedManga => {
        // delete then add in the array
        const updatedMangas = mangasTracked.filter(manga => manga.id !== updatedManga.id);
        const sortedMangas = [...updatedMangas, updatedManga]
            .sort((m1, m2) => m1.manga.mangaTrackedId - m2.manga.mangaTrackedId);
        updateMangaGrid(sortedMangas);
    };

    useEffect(() => {
        getMangasTracked(
            result => {
                if (result.length > 0) {
                    const sortedMangas = result.sort((m1, m2) => m1.manga.mangaTrackedId - m2.manga.mangaTrackedId);
                    updateMangaGrid(sortedMangas);
                }

                setLoading(false);
            },
            error => {
                setLoading(false);
                setError(error);
            }
        );
    }, []);

    const updateMangaGrid = mangasTracked => {
        setMangasTracked(mangasTracked);
        filterByStatus(mangasTracked)
    };

    const filterByStatus = mangasTracked => {
        setToReadMangas(mangasTracked.filter(manga => manga.mangaStatus.status === TO_READ));
        setOnGoingMangas(mangasTracked.filter(manga => manga.mangaStatus.status === ON_GOING));
        setCompletedMangas(mangasTracked.filter(manga => manga.mangaStatus.status === COMPLETED));
    };

    if (mangasTracked.length === 0 && !loading) {
        return (
            <div>
                <p>
                    Aucun manga suivi ! Commencez par en{" "}
                    <Link to="/search-manga">suivre</Link> quelques-un.
                </p>
            </div>
        )
    }

    return (
        <> {loading && <Loading/>}
            {gridMode && <GridSystem toReadMangas={toReadMangas} completedMangas={completedMangas} onGoingMangas={onGoingMangas} updateMangas={updateMangas}/>}
            {!gridMode && <ColumnSystem/>}
        </>
    )
};