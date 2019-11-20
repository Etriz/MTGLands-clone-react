import React, { Component } from "react";
import CardItem from "./CardItem";

class All extends Component {
  render() {
    // console.log({ allLands: this.props.allLands });

    return (
      <div id="listArea" className="container">
        <ul className="row">
          <CardItem allLands={this.props.allLands} />
        </ul>
      </div>
    );
  }
}
export default All;
