import React, {useState, useEffect} from "react";
import {MangaGrid} from "./MangaGrid";
import {searchMangaByName, getMangasStatusList} from "../../../services/MangaService";
import AlertC from "../../shared/AlertC";
import Loading from "../loading/Loading";
import {PaginationBar} from "../../shared/PaginationBar";
import {SearchSvg} from "../../shared/searchSvg";

export const FindManga = () => {
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mangas, setMangas] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [mangasStatus, setMangasStatus] = useState([]);


    useEffect(() => {
        getMangasStatusList(
            result => setMangasStatus(result),
            error => setError(error),
        )
    }, []);


    const handleChange = evt => {
        setLoading(false);
        setKeyword(evt.target.value);

        if (mangas) {
            setMangas(null);
            setPage(0);
            setTotalPages(0);
        }
    };

    const findManga = event => {
        event.preventDefault();

        if (keyword) {
            searchByName();
        }
    };

    const searchByName = (currentPage = page) => {
        setLoading(true);

        searchMangaByName(
            keyword,
            currentPage,
            searchMangaOk,
            searchMangaError,
            true
        );
    };

    const searchMangaOk = result => {
        setLoading(false);
        setMangas(result.content);
        setPage(result.number);
        setTotalPages(result.totalPages);
    };

    const searchMangaError = error => {
        setLoading(false);
        setError(error);
    };


    return (
        <React.Fragment>
            <div className="container">
                <div className="row search-in-dashboard align-items-center shadow-sm">
                    <div className="col-sm-6 px-5 text-left rounded-inputs">
                        <h2 className="text-dark font-weight-bold">Rechercher un manga</h2>
                        <h4 className="text-dark">et suivez le dès maintenant.</h4>
                        <form className="form-inline" role="form" id="SearchInDashboardForm" onSubmit={findManga}>
                            <div className="input-group mb-3 w-100">
                                <input
                                    value={keyword}
                                    type="text"
                                    className="form-control border-0 outline-none"
                                    placeholder="Chercher un manga"
                                    onChange={handleChange}
                                    aria-describedby="searchMangaInputGroup"
                                />
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="searchMangaInputGroup" onClick={findManga}>
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-sm-6 p-4 search-in-dashboard text-right rounded-inputs">
                        <SearchSvg/>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            {
                error
                    ? <AlertC
                        information={{
                            class: "danger",
                            content:
                                "Problème lors de la récupération des mangas. Veuillez ressayer."
                        }}
                    />
                    : ""
            }
            {loading ?
                (
                    <div>
                        <Loading/>
                    </div>
                )
                : ""
            }
            {mangas && mangas.length === 0 ?
                <>
                    <h4 className="text-left">Aucun manga trouvé.</h4>
                </> : ""

            }
            {mangas && mangas.length > 0 ?
                <>
                    <MangaGrid mangas={mangas} mangasStatus={mangasStatus}/>
                    <PaginationBar currentPageNumber={page} totalPage={totalPages} getPage={searchByName}/>
                </> : ""

            }
        </React.Fragment>
    );
};
