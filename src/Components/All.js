import React, { Component } from "react";
import CardItem from "./CardItem";

class All extends Component {
  render() {
    // console.log({ allLands: this.props.allLands });

    return (
      <ul id="listArea">
        <CardItem allLands={this.props.allLands} />
      </ul>
    );
  }
}
export default All;
