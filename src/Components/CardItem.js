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
    const identity = i => {
      let color = "";
      i.color_identity.forEach(element => {
        color += element;
      });
      if (color === "") {
        color = "C";
      }
      return color;
    };
    const cardItems = this.props.allLands.map(item => {
      return (
        <li key={item.name}>
          {item.name} {identity(item)}
        </li>
      );
    });
    return <>{cardItems}</>;
  }
}
export default CardItem;
