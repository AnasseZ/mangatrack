import React from "react";

import {
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

export const ProfilPopover = ({isOpen, toggle, logout}) => {
    return (
      <Popover
        placement="bottom"
        isOpen={isOpen}
        target="userIcon"
        toggle={toggle}
      >
        <PopoverBody className="p-0">
          <ListGroup>
            <ListGroupItem className="no-border-top">Mon profil</ListGroupItem>
            <ListGroupItem>Informations personnelles</ListGroupItem>
            <ListGroupItem onClick={logout}>Se déconnecter</ListGroupItem>
          </ListGroup>
        </PopoverBody>
      </Popover>
    );
};
