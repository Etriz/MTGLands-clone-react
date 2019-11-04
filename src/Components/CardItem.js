import React, { Component } from "react";

class CardItem extends Component {
  render() {
    // const mana = elem => {
    //   if ((elem.color_identity = [])) {
    //     return "C";
    //   } else if ((elem.color_identity[1] = undefined)) {
    //     return elem.color_identity[0];
    //   } else {
    //     return elem.color_identity[0] + elem.color_identity[1];
    //   }
    // };
    const cardItems = this.props.allLands.map(item => {
      return (
        <li key={item.name}>
          {item.name} {item.color_identity[0] + item.color_identity[1] || "C"}
        </li>
      );
    });
    return <>{cardItems}</>;
  }
}
export default CardItem;
