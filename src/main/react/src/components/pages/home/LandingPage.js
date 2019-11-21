import React from "react";
import {FakeMangaTracked} from "./FakeMangaTracked";

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
                                <h2 className="heading-landing mb-3">MangaTrack</h2>
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

                                <div><FakeMangaTracked/></div>

                            </div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1"
                              d="M0,64L60,90.7C120,117,240,171,360,192C480,213,600,203,720,176C840,149,960,107,1080,96C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </section>
            </>

        )
    }
}
