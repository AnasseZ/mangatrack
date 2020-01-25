import React from "react";
import {FakeMangaList} from "./FakeMangaList";
import {Footer} from "../../shared/Footer";
import {FeatureCard} from "./FeatureCard";

export const LandingPage = () => {

    const features = [
        {
            title: 'Suivi de mangas',
            description: 'Suivez vos mangas préférés et ne ratez plus aucune sortie !',
            href: '#mangaSection'
        },
        {
            title: 'Tableau de bord',
            description: 'Organisez vos mangas et séries suivant dans un tableau de bord interactif permettant de voir en temps réel l\'avancé de vos lectures et visionnages.',
            href: '#mangaSection'
        },
        {
            title: 'Suivi de séries',
            description: "Votre série préférée n'est pas sûr Netflix? Vous n'avez aucun moyen de tracez vos visionnages? MangaTrack est là pour vous.",
            href: '#mangaSection'
        }
    ];

    return (
        <>
            <section
                className="text-left"
                id="heading-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-5 col-lg-5 col-md-3">
                            <h1 className="heading-landing mb-3">MangaTrack</h1>
                            <div className="sub-heading-landing">
                                <p className="mb-4">Suis tout tes mangas préférés en illimité au même endroit et en
                                    temps réel.
                                </p>
                                <p className="mb-5"><a className="btn btn-success btn-lg btn-pill smoothscroll"
                                                       href="/signup"><span
                                    className="pb_font-14 text-uppercase pb_letter-spacing-1">Commencer</span></a>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-md-9 relative align-self-center">
                            <div><FakeMangaList/></div>

                        </div>
                    </div>
                </div>
            </section>
            <div className="wave-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#35465d" fillOpacity="1"
                          d="M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,122.7C672,128,768,192,864,218.7C960,245,1056,235,1152,218.7C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>
            <section className="pt-5 section-bg-grey-light">
                <h1>Features</h1>
                <div className="row mx-3 justify-content-center">
                    {
                        features.map((feature, index) => <FeatureCard index={index} feature={feature}/>)
                    }
                </div>
            </section>
            <Footer/>
        </>
    );
};
