import React from "react";
import {ColumnItem} from "./ColumnItem";
import {Droppable} from "react-beautiful-dnd";

export const CategoryColumn = ({category, updateMangas}) => {

    const {mangas, title} = category;

    return (
        <div className="list-wrapper">
            <div className="list-content">
                <div className="list-header text-left">
                    <h4 className="text-dark mb-0">{title}</h4>
                    <h6 className="d-inline-block text-grey">{mangas.length} mangas</h6>
                </div>
                <div className="list-cards">
                    <Droppable droppableId={category.columnId.toString()}>
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
                </div>
            </div>
        </div>
    )
};