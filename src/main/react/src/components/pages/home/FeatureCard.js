import React from "react";

export const FeatureCard = ({feature}) => {

    const {title, description, href} = feature;

    return (
        <div className="col-xl-3 col-lg-4 col-md-5 col-12 card shadow border-0 m-5">
            <div className="p-3 d-flex h-100 justify-content-between flex-column">
                <h5 className="font-weight-bold">{title}</h5>
                <div className="card-body text-grey feature-description text-center">
                    {description}
                </div>
                <a href={href} className="mt-2 text-decoration-none text-blue text-xl text-left font-weight-bold">
                    Voir <i className="fas fa-long-arrow-alt-right"></i>
                </a>
            </div>
        </div>
    );
};