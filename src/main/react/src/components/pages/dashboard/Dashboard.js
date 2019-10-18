import React from "react";
import {Title} from "../../shared/Title";
import {AuthConsumer} from "../../../contexts/AuthContext";
import {MangaTrackedGrid} from "./MangaTrackedGrid";

export const Dashboard = ({user}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-center">
                    <Title title="Dashboard"/>
                    <br/>
                    <br/>
                    <MangaTrackedGrid mangas={user.mangasTracked} lastFetchInformations={user.lastFetchInformations}/>
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
