import React from "react";
import {ColumnItem} from "./ColumnItem";
import {Link} from "react-router-dom";
import {Droppable} from "react-beautiful-dnd";
import {frenchStatusList} from "../../../constantes/mangaStatus";

export const CategoryColumn = ({category, updateMangas}) => {

    const {mangas, status} = category;
    const title = frenchStatusList[status.status];

    return (
        <div className="list-wrapper col-lg-4 col-md-12 col-12 mt-tablette">
            <div className="list-content">
                <div className="list-header text-left">
                    <h4 className="text-dark mb-0">{title}</h4>
                    <h6 className="d-inline-block text-grey">{mangas.length} mangas</h6>
                </div>
                <div className="list-cards">
                    <Droppable droppableId={category.id.toString()}>
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    mangas.map(
                                        (manga, index) => <ColumnItem key={manga.id}
                                                                      mangaTracked={manga}
                                                                      updateMangas={updateMangas}
                                                                      index={index}
                                        />)
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Link to="/search-manga">
                        <button className="btn btn-outline-light text-dark border-0 w-100 mb-2">
                            <i className="fas fa-plus"></i>{' '}
                            Ajouter un manga
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};