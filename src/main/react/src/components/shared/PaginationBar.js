import React from "react";

export const PaginationBar = ({getPage, currentPageNumber, totalPage}) => {

    // +1 because the first page start at 0
    // ie, when having only one page,e currentPage = 0 and totalPage = 1
    const hasNextPage = currentPageNumber + 1 < totalPage;

    const hasPreviousPage = currentPageNumber > 0;


    const getNexPage = () => {
        getPage(currentPageNumber + 1);
    };

    const getPreviousPage = () => {
        getPage(currentPageNumber - 1);
    };

    const hasOnePage = totalPage === 1;

    return (
        hasOnePage ? "" :

            <div className="row justify-content-around">
                <button type="button" className="btn btn-sm btn-primary" onClick={getPreviousPage}
                        disabled={!hasPreviousPage}>
                    Page précédente
                </button>
                <button type="button" className="btn btn-sm btn-primary" onClick={getNexPage} disabled={!hasNextPage}>
                    Page suivante
                </button>
            </div>
    );
};