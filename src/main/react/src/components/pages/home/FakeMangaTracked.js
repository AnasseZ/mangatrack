import React from "react";
import OnepieceCover from "../../../assets/onepiece-cover.jpg";

export const FakeMangaTracked = () => {

    const mangas = [
        {
            title: "One piece",
            imgSrc: OnepieceCover,
            lastChapterOut: 961,
            lastChapterRead: 498,
            id: 1
        },
        {
            title: "One bouze",
            imgSrc: OnepieceCover,
            lastChapterOut: 961,
            lastChapterRead: 961,
            id: 2
        },
        {
            title: "One piece",
            imgSrc: OnepieceCover,
            lastChapterOut: 961,
            lastChapterRead: 122,
            id: 3
        }
    ];

    return (
        <>
            <div className="d-flex">
                {
                    mangas.map(manga => (
                        <FakeMangaCard manga={manga} key={manga.id} />
                    ))
                }
            </div>
        </>
    );
};


const FakeMangaCard = ({manga}) => {
    return (
        <div className="col-lg-4 col-sm-4 col-4 col-manga">
            <div className="card border-0 shadow-lg">
                <img
                    className="card-img-top"
                    src={manga.imgSrc}
                    alt={"Miniature manga " + manga.id}
                />
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{manga.title}</h5>
                        <p className="card-text">
                            Chapitre {manga.lastChapterOut}{" "}
                            <a href="" className="bisque">
                                <i className="far fa-arrow-alt-circle-right"/>
                            </a>
                        </p>
                        {manga.lastChapterOut === manga.lastChapterRead ? (
                            <p className="card-text is-up-to-date">À jour !</p>
                        ) : (
                            <p className="card-text">
                                Dernier lu: <strong>{manga.lastChapterRead}</strong>
                            </p>
                        )}
                    </div>

                    <div className="row-edit mb-2">
                        <i
                            className="fas fa-edit float-right edit-icon hover-white grey"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};