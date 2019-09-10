import React from "react";
import {Manga} from "./Manga";
import AlertC from "../../shared/AlertC";

export default class MangaGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertContent: null
        };
    }

    setAlertContent(param) {
        this.setState({
            alertContent: param
        });
    }

    render() {
        const {mangas} = this.props;
        return (
            <React.Fragment>
                <AlertC information={this.state.alertContent}/>
                <hr className="hr-separator"/>
                <div className="row row-eq-height">
                    {mangas.map((manga, key) => (
                        <Manga
                            manga={manga}
                            key={key}
                            callback={this.setAlertContent.bind(this)}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}
