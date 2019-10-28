import React, { Component } from "react";
import All from "./Components/All.js";
import "./App.css";

class App extends Component {
  state = {
    newState: [],
    //   legal: ["standard", "pioneer", "modern"],
    //   type: ["check", "shock", "gate", "scry", "castle"],
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <All />
        </header>
      </div>
    );
  }
}

export default App;
