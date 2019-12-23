import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";
import {MangaTracked} from "./MangaTracked";
import {getMangasTracked} from "../../../services/MangaService";
import Loading from "../loading/Loading";
import {COMPLETED, ON_GOING, TO_READ} from "../../../constantes/mangaStatus";
import {CategoryGrid} from "./CategoryGrid";

export const MangaTrackedGrid = () => {
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
            <CategoryGrid mangasTracked={onGoingMangas} updateMangas={updateMangas} title='En cours'/>
            <br/><br/><br/>

            <CategoryGrid mangasTracked={toReadMangas} updateMangas={updateMangas} title='À lire'/>
            <br/><br/><br/>

            <CategoryGrid mangasTracked={completedMangas} updateMangas={updateMangas} title='Terminé'/>
        </>
    );
};
