import React from "react";
import OnepieceCover from "../../../assets/onepiece-cover.jpg";
import KenganCover from "../../../assets/kengan-cover.jpg";
import NarutoCover from "../../../assets/naruto-cover.jpg";
import TpnCover from "../../../assets/tpn-cover.jpg";

export const FakeMangaList = () => {

    const mangas = [
        {
            title: "Naruto",
            imgSrc: NarutoCover,
            lastChapterOut: 700,
            lastChapterRead: 698,
            id: 4
        },
        {
            title: "The Promised Neverland",
            imgSrc: TpnCover,
            lastChapterOut: 158,
            lastChapterRead: 158,
            id: 2
        },
        {
            title: "Kengan Omega",
            imgSrc: KenganCover,
            lastChapterOut: 41,
            lastChapterRead: 40,
            id: 3
        },
        {
            title: "One piece",
            imgSrc: OnepieceCover,
            lastChapterOut: 961,
            lastChapterRead: 498,
            id: 1
        }
    ];

    return (
        <>
            <div className="d-flex justify-content-center">
                {
                    mangas.map(manga => (
                        <FakeMangaCard manga={manga} key={manga.id}/>
                    ))
                }
            </div>
        </>
    );
};


const FakeMangaCard = ({manga}) => {
    return (
        <div className="col-lg-4 col-sm-4 col-4 col-manga scale-on-hover">
            <div className="card border-0 shadow-lg card-manga">
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
                            <a href="" className="text-blue">
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