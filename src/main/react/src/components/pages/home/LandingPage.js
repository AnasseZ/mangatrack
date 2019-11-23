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
                </section>
                <section className="mt-5 bg-light">
                    <h1>Features</h1>
                </section>
            </>
        )
    }
}
