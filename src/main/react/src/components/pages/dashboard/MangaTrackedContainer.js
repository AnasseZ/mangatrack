import React, {useState, useEffect} from "react";

import {getMangasStatusList, getMangasTracked} from "../../../services/MangaService";
import {COMPLETED, frenchStatusList, ON_GOING, TO_READ} from "../../../constantes/mangaStatus";
import Loading from "../loading/Loading";
import {Link} from "react-router-dom";
import {GridSystem} from "./GridSystem";
import {ColumnSystem} from "./ColumnSystem";

export const MangaTrackedContainer = ({gridMode}) => {

    const [mangasTracked, setMangasTracked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [mangaStatusList, setMangaStatusList] = useState(null);

    /** MANGAS FILTER BY STATUS */
    const [categories, setCategories] = useState([]);

    const updateMangas = updatedManga => {
        // delete then add in the array
        const updatedMangas = mangasTracked.filter(manga => manga.id !== updatedManga.id);
        const sortedMangas = [...updatedMangas, updatedManga];

        // update list with new item
        updateMangaGrid(sortedMangas);
    };

    const getMangaTrackedList = () => {
        getMangasTracked(
            result => {
                    updateMangaGrid(result);
            },
            error => {
                setError(error);
            }
        );
    };

    // at first render
    useEffect(() => {
        getMangasStatusList(statusList => {
                setMangaStatusList(statusList);
                setLoadingStatus(false);
            },
            error => setError(error)
        );
    }, []);

    // when mangastatuslist state is updated
    useEffect(() => {
        if (mangaStatusList) {
            getMangasTracked(
                result => {
                    if (result.length > 0) {
                        updateMangaGrid(result);
                    }

                    setLoading(false);
                },
                error => {
                    setLoading(false);
                    setError(error);
                }
            );
        }
    }, [mangaStatusList]);

    const updateMangaGrid = mangasTracked => {
        setMangasTracked(mangasTracked);
        createCategoriesByStatus(mangasTracked);
    };

    const createCategoriesByStatus = mangasTracked => {
        let generatedCategories = [];

        mangaStatusList.forEach((mangaStatus, index) => generatedCategories.push(
            {
                id: index,
                mangas: mangasTracked.filter(manga => manga.mangaStatus.status === mangaStatus.status)
                    .sort((m1, m2) => m1.position - m2.position),
                status: mangaStatus
            }));

        setCategories(generatedCategories);
    };

    if (loading || loadingStatus) {
        return <Loading/>;
    }
    if (mangasTracked.length === 0 && !loading && !loadingStatus) {
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
        <>
            {gridMode &&
            <GridSystem categories={categories} updateMangas={updateMangas}
                        setCategories={setCategories}/>}
            {!gridMode &&
            <ColumnSystem categories={categories}
                          updateMangas={updateMangas} getMangaTrackedList={getMangaTrackedList}/>}
        </>
    )
};