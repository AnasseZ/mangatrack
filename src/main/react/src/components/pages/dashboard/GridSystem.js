import React from "react";

import {CategoryGrid} from "./CategoryGrid";

export const GridSystem = ({categories, updateMangas}) => {
    return (
        <>
            {
                categories.map((category, key) =>
                    <CategoryGrid key={category.gridId} mangasTracked={category.mangas} updateMangas={updateMangas}
                                  title={category.title}/>
                )
            }
        </>
    );
};
