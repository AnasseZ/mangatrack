import React from 'react';
import {CategoryColumn} from "./CategoryColumn";
import {DragDropContext} from "react-beautiful-dnd";


export const ColumnSystem = ({categories, updateMangas}) => {

    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }
    };

    return (
        <div id="column-board" className="row mt-3">
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    categories.map(category =>
                        <CategoryColumn key={category.columnId} category={category} updateMangas={updateMangas}/>
                    )
                }
            </DragDropContext>
        </div>
    )
};