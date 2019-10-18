import React from "react";
import {Title} from "../../shared/Title";
import {AuthConsumer} from "../../../contexts/AuthContext";
import {MangaTrackedGrid} from "./MangaTrackedGrid";

export const Dashboard = ({user}) => {

    const sortedMangas = user.mangasTracked.sort((m1, m2) => m1.mangaTrackedId - m2.mangaTrackedId);
    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-center">
                    <Title title="Dashboard"/>
                    <br/>
                    <br/>
                    <MangaTrackedGrid
                        mangas={sortedMangas}
                        lastFetchInformations={user.lastFetchInformations}
                    />
                </div>
            </div>
        </div>
    );
};

export default () => (
    <AuthConsumer>
        {({user}) => <Dashboard user={user}/>
        }
    </AuthConsumer>
);
