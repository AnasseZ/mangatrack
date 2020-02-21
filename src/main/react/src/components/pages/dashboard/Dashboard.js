import React, {useState} from "react";
import {Title} from "../../shared/Title";
import {AuthConsumer} from "../../../contexts/AuthContext";
import {MangaTrackedContainer} from "./MangaTrackedContainer";

export const Dashboard = ({user}) => {

    // TODO: define how to store display mode
    const [gridMode, setGridMode] = useState(true);

    const notSelectedStyle = ' not-selected';
    let gridIconStyle = '';
    let columnIconStyle = '';

    if (gridMode) {
        columnIconStyle = notSelectedStyle;
    } else {
        gridIconStyle = notSelectedStyle;
    }

    const updateGridMode = useGrid => {
        setGridMode(useGrid);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-center">
                    <br/>
                    <br/>
                    <Title title="Tableau de bord"/>
                    <br/>
                    <br/>
                    <div className="mt-3 text-right text-white">
                        <span className="cursor-pointer" onClick={() => updateGridMode(true)}>
                            <i className={"fas fa-th-large fa-lg mr-2" + gridIconStyle}></i>
                        </span>
                        <span className="cursor-pointer" onClick={() => updateGridMode(false)}>
                            <i className={"fab fa-trello fa-lg" + columnIconStyle}></i>
                        </span>

                    </div>
                    <MangaTrackedContainer gridMode={gridMode}/>
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
