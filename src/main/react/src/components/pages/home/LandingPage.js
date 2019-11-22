import React from "react";
import {FakeMangaList} from "./FakeMangaList";

export default class LandingPage extends React.Component {
    render() {
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1"
                              d="M0,160L48,144C96,128,192,96,288,101.3C384,107,480,149,576,170.7C672,192,768,192,864,176C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </section>
            </>
        )
    }
}
