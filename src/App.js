import React, { Component } from "react";
import ButtonArea from "./Components/ButtonArea.js";
import All from "./Components/All.js";

class App extends Component {
  //   type: ["check", "shock", "gate", "scry", "castle"],

  state = {
    allLands: [],
    someLands: [],
    format: [
      "Standard",
      "Historic",
      "Pioneer",
      "Modern",
      "Legacy",
      "Pauper",
      "Vintage",
      "Commander",
    ],
    type: {},
    showLands: false,
  };
  showLands = () => {
    this.setState({
      showLands: true,
    });
  };
  clearLands = () => {
    this.setState({
      showLands: false,
    });
  };
  getAllCards = () => {
    if (this.state.allLands.length > 0) {
      // there is already data in state
      console.log(`state already has ${this.state.someLands.length} items`);
      this.setState({ someLands: this.state.allLands });
      this.showLands();
    } else {
      // there is no data in state
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
          // fetch all land cards spread across 4 pages of results
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
          ])
            .then(dataArray => {
              let temp = [];
              for (let i = 0; i < dataArray.length; i++) {
                temp.push(...dataArray[i].data);
              }
              console.log(`temp[] populated? ${temp.length} items`);
              //set the list of all lands as a array in state
              this.setState({ allLands: temp });
              this.setState({ someLands: temp });
              // this.setState({ format: Object.keys(temp[0].legalities) }); uses api data to populate the format array instead of declaring it staticly
              this.showLands();
            })
            .then(() => {
              //fetch the 10 shocklands and add to state.type object
              fetch("https://api.scryfall.com/cards/search?q=is%3Ashockland")
                .then(json)
                .then(shockData => {
                  let shock = [];
                  for (let i = 0; i < shockData.data.length; i++) {
                    shock.push(shockData.data[i].name);
                  }
                  console.log(`shock[] populated? ${shock.length} items`);
                  const type = { ...this.state.type, Shocklands: shock };
                  this.setState({ type: type });
                  console.log({ type: this.state.type });
                });
            })
            .then(() => {
              //fetch the 10 checklands and add to state.type object
              fetch("https://api.scryfall.com/cards/search?q=is%3Acheckland")
                .then(json)
                .then(checkData => {
                  let check = [];
                  for (let i = 0; i < checkData.data.length; i++) {
                    check.push(checkData.data[i].name);
                  }
                  console.log(`check[] populated? ${check.length} items`);
                  const type = { ...this.state.type, Checklands: check };
                  this.setState({ type: type });
                  console.log({ type: this.state.type });
                });
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  legal = elem => {
    if (this.state.allLands.length === 0) {
      //do nothing if state is empty
      console.log(`State is empty`);
    } else {
      this.showLands();
      let format = elem.toLowerCase();
      const result = this.state.allLands.filter(item => item.legalities[format] === "legal");
      this.setState({ someLands: result });
    }
  };
  type = elem => {
    if (this.state.allLands.length === 0) {
      //do nothing if state is empty
      console.log(`State is empty`);
    } else {
      this.showLands();
      let type = [...this.state.type[elem]];
      const result = this.state.allLands.filter(item => type.includes(item.name));
      this.setState({ someLands: result });
    }
  };

  render() {
    let displayAllJS = null;
    if (this.state.showLands === true) {
      displayAllJS = <All allLands={this.state.someLands} />;
    }

    return (
      <div className="App">
        <ButtonArea
          state={this.state}
          getAllCards={this.getAllCards}
          clearLands={this.clearLands}
          legal={this.legal}
          type={this.type}
        />
        {displayAllJS}
      </div>
    );
  }
}

export default App;
