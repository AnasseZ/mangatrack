import React from "react";

import {CategoryGrid} from "./CategoryGrid";

export const GridSystem = ({toReadMangas,onGoingMangas, completedMangas, updateMangas}) => {
    return (
        <>
            <CategoryGrid mangasTracked={onGoingMangas} updateMangas={updateMangas} title='En cours'/>
            <br/><br/><br/>

            <CategoryGrid mangasTracked={toReadMangas} updateMangas={updateMangas} title='À lire'/>
            <br/><br/><br/>

            <CategoryGrid mangasTracked={completedMangas} updateMangas={updateMangas} title='Terminé'/>
        </>
    );
};
