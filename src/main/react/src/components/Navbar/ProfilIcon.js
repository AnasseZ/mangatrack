import React from "react";

import {ProfilPopover} from "./popovers/ProfilPopover";
import {AuthConsumer} from "../../contexts/AuthContext";

export default class ProfilIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false
        };
    }

    toggle = (e) => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    };

    render() {
        return (
            <>
                <span className="badge" onClick={this.toggle} id="userIcon">{this.props.user.username[0]}</span>
                <AuthConsumer>
                    {({logout}) =>
                        <ProfilPopover isOpen={this.state.popoverOpen} toggle={this.toggle} logout={logout}/>
                    }
                </AuthConsumer>
            </>
        );
    }
}
