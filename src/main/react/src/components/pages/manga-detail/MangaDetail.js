import React from "react";


export default ({match}) => {


    return (
        <>
            <div className="container container-detail mt-5">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 col-md-6 col-12">
                        <img
                            className="img-detail"
                            src="https://mangadex.org/images/manga/5.jpg?1526016755"
                            alt="Miniature manga"
                        />
                    </div>
                    <div className="col-sm-6 col-lg-8 col-md-6 col-12 text-left col-detail">
                        <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                                <h1 className="detail-mangaTitle">One piece</h1>
                                <h4 className="detail-mangaAuthor">Eiichiro Oda</h4>
                            </div>
                            <div className="manga-detail-form">
                                <div className="form-group d-flex">
                                    <p className="col-sm-4 col-6 ">Parution :</p>
                                    <p className="font-weight-bold col-6">En cours</p>
                                </div>
                                <div className="form-group d-flex">
                                    <p className="col-sm-4 col-6">Dernier chapitre sortie :</p>
                                    <p className="font-weight-bold col-6">989</p>
                                </div>
                                <div className="form-group d-flex">
                                    <label className=" col-form-label col-sm-4 col-6">Dernier chapitre lu :</label>
                                    <input
                                        type="number"
                                        className="form-control w-auto mb-1 col-6"
                                        placeholder="Mis à jours"
                                        value={99}
                                        onChange={""}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-form-label col-sm-4 col-6" htmlFor="selectCategory">Statut
                                        :</label>
                                    <select className="form-control w-auto col-6" id="selectCategory">
                                        <option>En cours</option>
                                        <option>Terminé</option>
                                        <option>A lire</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end row-detail-follow">
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={""}
                                >
                                    Ne plus suivre
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success ml-2"
                                    onClick={""}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};