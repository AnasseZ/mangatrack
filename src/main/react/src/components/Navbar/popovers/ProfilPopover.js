import React from "react";

import {
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

export class ProfilPopover extends React.Component {
  render() {
    return (
      <Popover
        placement="bottom"
        isOpen={this.props.isOpen}
        target="userIcon"
        toggle={this.props.toggle}
      >
        <PopoverBody className="p-0">
          <ListGroup>
            <ListGroupItem className="no-border-top">Mon profil</ListGroupItem>
            <ListGroupItem>Informations personnelles</ListGroupItem>
            <ListGroupItem>Se déconnecter</ListGroupItem>
          </ListGroup>
        </PopoverBody>
      </Popover>
    );
  }
}
