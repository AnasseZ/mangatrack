import {Link} from "react-router-dom";
import React from "react";

export const Footer = () => {

    const dateNow = new Date();
    const year = dateNow.getFullYear();

    return (
        <section className="section-bg-grey-light">
            <div className="d-flex justify-content-between align-center copyright mx-4 pt-2" id="footer">
                <p className="text-grey">© {year} Mangatrack.io </p>
                <div>
                    <Link to="/lol" className="font-weight-light text-grey pr-2 text-decoration-none">
                        Mentions légales
                    </Link>
                    <Link to="/lol" className="font-weight-light text-grey pr-2 text-decoration-none">
                        Twitter
                    </Link>

                </div>
            </div>
        </section>
    );
};