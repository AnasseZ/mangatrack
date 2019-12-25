import React from "react";

import {CategoryGrid} from "./CategoryGrid";

export const GridSystem = ({categories, updateMangas}) => {
    return (
        <>
            {
                categories.map(category =>
                    <CategoryGrid key={category.id} mangasTracked={category.mangas} updateMangas={updateMangas}
                                  title={category.title}/>
                )
            }
        </>
    );
};
