import React, {useState} from "react";
import MangaGrid from "./MangaGrid";
import {searchMangaByName} from "../../../services/MangaService";
import AlertC from "../../shared/AlertC";
import Loading from "../loading/Loading";
import {PaginationBar} from "../../shared/PaginationBar";

export const FindManga = ({token}) => {
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mangas, setMangas] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    const handleChange = evt => {
        setLoading(false);
        setKeyword(evt.target.value);

        if (mangas) {
            setMangas([]);
            setPage(0);
            setTotalPages(0);
        }
    };

    const findManga = () => {
        searchByName();
    }

    const searchByName = (currentPage = page) => {

        console.log(currentPage);
        setLoading(true);

        searchMangaByName(
            keyword,
            currentPage,
            searchMangaOk,
            searchMangaError,
            token
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
            <div className="row justify-content-center">
                <div className="col-8 col-sm-4">
                    <input
                        value={keyword}
                        type="text"
                        className="form-control"
                        id="mangaSearch"
                        placeholder="Chercher un manga"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-4 col-sm-2 text-left pl-0">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={findManga}
                        id="btnSubManga"
                        disabled={!keyword}
                    >
                        Chercher
                    </button>
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
            {mangas.length > 0 ?
                <>
                    <MangaGrid mangas={mangas}/>
                    <PaginationBar currentPageNumber={page} totalPage={totalPages} getPage={searchByName}/>
                </> : ""

            }
        </React.Fragment>
    );
};
