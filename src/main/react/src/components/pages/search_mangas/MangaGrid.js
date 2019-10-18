import React, { useState } from "react";
import {Manga} from "./Manga";
import AlertC from "../../shared/AlertC";

export const MangaGrid = ({mangas}) => {

    const [alertContent, setAlertContent] = useState(null);

    return (
        <React.Fragment>
            <AlertC information={alertContent}/>
            <hr className="hr-separator"/>
            <div className="row row-eq-height">
                {mangas.map((manga, key) => (
                    <Manga
                        manga={manga}
                        key={key}
                        callback={setAlertContent}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};
