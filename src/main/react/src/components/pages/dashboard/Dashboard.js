import React from "react";
import {PageContainer} from "../../shared/PageContainer";

export const Dashboard = () => {
    return (
        <PageContainer title="Tableau de bord">
            <div className="row">

                <div className="col-12 col-sm-6 col-xl mb-4">
                    <div className="card flex-fill">
                        <div className="card-body py-4 shadow">
                            <div className="media">
                                <div className="d-inline-block mt-2 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         className="feather feather-activity feather-lg text-warning">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                                <div className="media-body">
                                    <h4 className="mb-2 text-dark font-weight-bold">17.212</h4>
                                    <div className="mb-0">Mangas en cours</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-xl mb-4">
                    <div className="card flex-fill">
                        <div className="card-body py-4 shadow">
                            <div className="media">
                                <div className="d-inline-block mt-2 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         className="feather feather-activity feather-lg text-warning">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                                <div className="media-body">
                                    <h4 className="mb-2 text-dark font-weight-bold">17.212</h4>
                                    <div className="mb-0">Chapitres sorties</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-xl mb-4">
                    <div className="card flex-fill">
                        <div className="card-body py-4 shadow">
                            <div className="media">
                                <div className="d-inline-block mt-2 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         className="feather feather-activity feather-lg text-warning">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                                <div className="media-body">
                                    <h4 className="mb-2 text-dark font-weight-bold">17.212</h4>
                                    <div className="mb-0">Séries en cours</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-xl mb-4">
                    <div className="card flex-fill">
                        <div className="card-body py-4 shadow">
                            <div className="media">
                                <div className="d-inline-block mt-2 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         className="feather feather-activity feather-lg text-warning">
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                    </svg>
                                </div>
                                <div className="media-body">
                                    <h4 className="mb-2 text-dark font-weight-bold">17.212</h4>
                                    <div className="mb-0">Episodes à voir</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
};