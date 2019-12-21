import React from "react";

import {
    Popover,
    PopoverBody,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import {Link} from "react-router-dom";

export const ProfilPopover = ({isOpen, toggle, logout}) => {
    return (
        <Popover
            placement="bottom"
            isOpen={isOpen}
            target="userIcon"
            toggle={toggle}
            trigger="legacy"
        >
            <PopoverBody className="p-0">
                <ListGroup className="font-roboto">
                    <ListGroupItem className="no-border-top">
                        <Link to="/profil" className="list-group-link" onClick={toggle}>
                            Mon profil
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem onClick={logout} className="cursor-pointer">Se déconnecter</ListGroupItem>
                </ListGroup>
            </PopoverBody>
        </Popover>
    );
};
