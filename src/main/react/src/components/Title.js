import React from "react";

export class Title extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4">
            <h1 className="text-left" id="pageTitle">{this.props.title}</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
