import React from "react";

import { Alert } from "reactstrap";

export default class AlertC extends React.Component {
  render() {
    return (
      <div className="row justify-content-center">
        {this.props.information != null ? (
          <Alert color={this.props.information.class} id="alertInfo">
            {this.props.information.content}
          </Alert>
        ) : (
          ""
        )}
      </div>
    );
  }
}
