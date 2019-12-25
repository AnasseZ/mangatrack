import React, {useState, useEffect} from "react";

import {getMangasTracked} from "../../../services/MangaService";
import {COMPLETED, frenchStatusList, ON_GOING, TO_READ} from "../../../constantes/mangaStatus";
import Loading from "../loading/Loading";
import {Link} from "react-router-dom";
import {GridSystem} from "./GridSystem";
import {ColumnSystem} from "./ColumnSystem";

export const MangaTrackedContainer = ({gridMode}) => {

    const [mangasTracked, setMangasTracked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** MANGAS FILTER BY STATUS */
    const [categories, setCategories] = useState([]);

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
        createCategoriesByStatus(mangasTracked)
    };

    const createCategoriesByStatus = mangasTracked => {
        let categories = [
            {
                gridId: 1,
                columnId: 2,
                mangas: mangasTracked.filter(manga => manga.mangaStatus.status === ON_GOING),
                title: frenchStatusList[ON_GOING]
            },
            {
                gridId: 2,
                columnId: 1,
                mangas: mangasTracked.filter(manga => manga.mangaStatus.status === TO_READ),
                title: frenchStatusList[TO_READ]
            },
            {
                gridId: 3,
                columnId: 3,
                mangas: mangasTracked.filter(manga => manga.mangaStatus.status === COMPLETED),
                title: frenchStatusList[COMPLETED]
            }
        ];

        setCategories(categories);
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
            {gridMode &&
            <GridSystem categories={categories.sort(((a, b) => a.gridId - b.gridId))} updateMangas={updateMangas}/>}
            {!gridMode &&
            <ColumnSystem categories={categories.sort(((a, b) => a.columnId - b.columnId))}
                          updateMangas={updateMangas}/>}
        </>
    )
};