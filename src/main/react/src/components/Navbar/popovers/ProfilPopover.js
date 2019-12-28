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
            id="profilPopover"
        >
            <PopoverBody className="p-0">
                <ListGroup className="font-roboto">
                    <ListGroupItem className="border-0">
                        <Link to="/profil" className="list-group-link" onClick={toggle}>
                            Mon profil
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem onClick={logout} className="cursor-pointer border-0">Se déconnecter</ListGroupItem>
                </ListGroup>
            </PopoverBody>
        </Popover>
    );
};
