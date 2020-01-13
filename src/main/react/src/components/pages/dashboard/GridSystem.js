import React from "react";

import {CategoryGrid} from "./CategoryGrid";

export const GridSystem = ({categories, updateMangas}) => {
    return (
        <>
            {
                categories.map((category, index) =>
                    <CategoryGrid key={index} category={category} updateMangas={updateMangas}/>
                )
            }
        </>
    );
};
