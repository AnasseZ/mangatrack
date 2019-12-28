import React from "react";

import {FindManga} from "./FindManga";
import {Title} from "../../shared/Title";

export default class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-center">
                        <br/>
                        <br/>
                        <Title title="Suivre un manga"/>
                        <br/>
                        <FindManga/>
                    </div>
                </div>
            </div>
        );
    }
}
