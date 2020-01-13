import React from 'react';
import {CategoryColumn} from "./CategoryColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {updateMangaTracked} from "../../../services/MangaService";
import {addErrorNotification, addSuccessNotification} from "../../../util/notification";


export const ColumnSystem = ({categories, updateMangas, getMangaTrackedList}) => {

    const onDragEnd = result => {

        const {destination, source, draggableId} = result;
        if (!result.destination) {
            return;
        }

        const newPosition = destination.index;
        const oldPosition = source.index;

        if (destination.droppableId === source.droppableId
            && newPosition === oldPosition
        ) {
            return;
        }

        const sourceCategory = categories.find(category => category.id.toString() === source.droppableId);
        const destinationCategory = categories.find(category => category.id.toString() === destination.droppableId);

        const mangaTrackedDragged = sourceCategory.mangas.find(m => m.id.toString() === draggableId);

        // delete in source
        sourceCategory.mangas.splice(oldPosition, 1);

        // add in destination
        destinationCategory.mangas.splice(newPosition, 0, mangaTrackedDragged);

        categories[source.droppableId] = sourceCategory;
        categories[destination.droppableId] = destinationCategory;

        //update dragged manga
        mangaTrackedDragged.position = newPosition;
        mangaTrackedDragged.mangaStatus = destinationCategory.status;

        updateMangaTracked(
            mangaTrackedDragged,
            result => {
                getMangaTrackedList();
                addSuccessNotification(result.position + " new position")
            },
            () =>
                addErrorNotification("Erreur ! Vous n'avez pas pu mettre à jour " +
                    mangaTrackedDragged.manga.title + "."),
            true
        );

    };

    return (
        <div id="column-board" className="row mt-3">
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    categories.map((category, index) =>
                        <CategoryColumn key={index} category={category} updateMangas={updateMangas}/>
                    )
                }
            </DragDropContext>
        </div>
    )
};