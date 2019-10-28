import React, { Component } from "react";

class CardItem extends Component {
  state = {
    allLands: [],
  };
  getAllCards = () => {
    const url = "https://api.scryfall.com/cards/random";
    const status = response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    };
    const json = response => response.json();

    fetch(url)
      .then(status)
      .then(() => {
        Promise.all([
          fetch("https://api.scryfall.com/cards/search?q=type%3Aland&unique=cards&page=1").then(
            json
          ),
          fetch("https://api.scryfall.com/cards/search?q=type%3Aland&unique=cards&page=2").then(
            json
          ),
          fetch("https://api.scryfall.com/cards/search?q=type%3Aland&unique=cards&page=3").then(
            json
          ),
          fetch("https://api.scryfall.com/cards/search?q=type%3Aland&unique=cards&page=4").then(
            json
          ),
        ]).then(dataArray => {
          let temp = [];
          for (let i = 0; i < dataArray.length; i++) {
            temp.push(...dataArray[i].data);
          }
          console.log(`temp[] populated? ${temp.length} items`);

          this.setState({ allLands: temp });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log({ state: this.state });
    let oof = this.state.allLands.map(land => {
      return (
        <p>
          {land.name} {land.color_identity[0] + land.color_identity[1] || "C"}{" "}
          {land.legalities.brawl}
        </p>
      );
    });
    return (
      <div>
        <li>{oof}</li>
        <button onClick={this.getAllCards}>Fetch</button>
      </div>
    );
  }
}
export default CardItem;
