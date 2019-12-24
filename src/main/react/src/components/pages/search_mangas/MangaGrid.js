import React from "react";
import {Manga} from "./Manga";

export const MangaGrid = ({mangas, mangasStatus}) => {

    return (
        <React.Fragment>
            <hr className="hr-separator"/>
            <div className="row row-eq-height">
                {mangas.map((manga, key) => (
                    <Manga
                        manga={manga}
                        key={key}
                        mangasStatus={mangasStatus}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};
