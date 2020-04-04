import React, {useState} from "react";
import {MangaTrackedContainer} from "./MangaTrackedContainer";
import {PageContainer} from "../../shared/PageContainer";

export const MangaDashboard = () => {

    // TODO: define how to store display mode
    const [gridMode, setGridMode] = useState(true);

    const notSelectedStyle = ' not-selected';
    let gridIconStyle = '';
    let columnIconStyle = '';

    if (gridMode) {
        columnIconStyle = notSelectedStyle;
    } else {
        gridIconStyle = notSelectedStyle;
    }

    const updateGridMode = useGrid => {
        setGridMode(useGrid);
    };

    return (
        <PageContainer title="Mes mangas">
            <div className="mt-3 text-right text-white">
                <span className="cursor-pointer" onClick={() => updateGridMode(true)}>
                    <i className={"fas fa-th-large fa-lg mr-2" + gridIconStyle}></i>
                </span>
                <span className="cursor-pointer" onClick={() => updateGridMode(false)}>
                    <i className={"fab fa-trello fa-lg" + columnIconStyle}></i>
                </span>
            </div>
            <MangaTrackedContainer gridMode={gridMode}/>
        </PageContainer>
    );
};