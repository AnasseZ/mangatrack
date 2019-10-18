import React, {useEffect} from "react";
import {Title} from "../../shared/Title";
import {AuthConsumer} from "../../../contexts/AuthContext";
import {MangaTrackedGrid} from "./MangaTrackedGrid";
import {addNotification} from "../../../util/notification";

export const Dashboard = ({user}) => {

    useEffect(() => {
        addNotification('Le manga a été suivi avec succès.', 'success');
    }, []);

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
