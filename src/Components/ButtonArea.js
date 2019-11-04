import React, { Component } from "react";

class ButtonArea extends Component {
  render() {
    // const btnStyle = {
    //   outline: "none",
    //   border: "none",
    //   padding: "3px 6px",
    //   background: "cyan",
    //   borderRadius: "5px",
    //   marginRight: "5px",
    // };

    const state = this.props.state;
    const btnFormatGroup = state.format.map(item => {
      return (
        <button key={item} onClick={this.props.legal} id={item} className="btn btn-dark m-1">
          {item}
        </button>
      );
    });
    const btnTypeGroup = Object.keys(state.type).map(item => {
      return (
        <button key={item} id={item} className="btn btn-dark m-1">
          {item}
        </button>
      );
    });
    return (
      <div className="buttonArea fixed-top">
        <div className="text-dark font-weight-bold">MTG Lands Clone</div>
        <br />
        <button onClick={this.props.getAllCards} className="btn btn-dark m-1">
          Fetch
        </button>
        <button onClick={this.props.clearLands} className="btn btn-dark m-1">
          Clear
        </button>
        {btnFormatGroup}
        <br />
        {btnTypeGroup}
      </div>
    );
  }
}
export default ButtonArea;
