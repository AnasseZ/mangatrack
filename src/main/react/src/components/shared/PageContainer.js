import React from "react";
import {Title} from "./Title";

export const PageContainer = ({children, title}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-center">
                    <br/>
                    <br/>
                    <Title title={title}/>
                    <br/>
                    <br/>
                    {children}
                </div>
            </div>
        </div>
    )
};