import React from "react";
import {ColumnItem} from "./ColumnItem";

export const CategoryColumn = ({mangasTracked, updateMangas, title}) => {

    return (
        <div className="list-wrapper">
            <div className="list-content">
                <div className="list-header text-left">
                    <h4 className="text-dark mb-0">{title}</h4>
                    <h6 className="d-inline-block text-grey">{mangasTracked.length} mangas</h6>
                </div>
                <div className="list-cards">
                    {
                        mangasTracked.map(
                            mangaTracked => <ColumnItem key={mangaTracked.id} mangaTracked={mangaTracked}
                                                        updateMangas={updateMangas}/>)
                    }
                </div>
            </div>

        </div>
    )
};