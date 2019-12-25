import React from 'react';
import {CategoryColumn} from "./CategoryColumn";


export const ColumnSystem = ({categories, updateMangas}) => {


    return (
        <div id="column-board" className="mt-3">
            {
                categories.map(category =>
                    <CategoryColumn key={category.id} mangasTracked={category.mangas} updateMangas={updateMangas} title={category.title}/>
                )
            }
        </div>
    )
};