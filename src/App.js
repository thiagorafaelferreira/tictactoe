import React, { useState } from "react";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "40px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const crossMark = {
  backgroundColor: "blue",
};

const circleMark = {
  backgroundColor: "green",
};

const initialValues = {
  winner: "None",
  lastPlayed: "cross",
  nextPlayer: "X",
  positions: [0, 0, 0, 0, 0, 0, 0, 0, 0],
};

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick(this.props.position);
  }
  render() {
    let style = {};
    let valuePosition = this.props.positions[this.props.position];
    if (valuePosition !== 0)
      style = valuePosition === 1 ? circleMark : crossMark;
    return (
      <div
        onClick={() => this.props.onClick(this.props.position)}
        className="square"
        style={{ ...squareStyle, ...style }}
      >
        {valuePosition === 0 ? "" : valuePosition === 1 ? "O" : "X"}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialValues };
    this.handleClickSquare = this.handleClickSquare.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.isWinner = this.isWinner.bind(this);
  }

  handleClickReset() {
    this.setState((prevState) => ({ ...initialValues }));
  }

  isWinner(positions) {
    let winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerCombinations.length; i++) {
      let [a, b, c] = winnerCombinations[i];
      if (
        positions[a] !== 0 &&
        positions[a] === positions[b] &&
        positions[a] === positions[c]
      )
        return true;
    }
    return false;
  }

  handleClickSquare(position) {
    console.log(position);
    let alteredPositions = [...this.state.positions];
    let lastPlayed = this.state.lastPlayed;
    let nextPlayer = this.state.nextPlayer;
    let winner = "None";

    if (this.state.winner === "None" && alteredPositions[position] === 0) {
      alteredPositions[position] = lastPlayed === "circle" ? 1 : 2;
      lastPlayed = lastPlayed === "circle" ? "cross" : "circle";
      nextPlayer = lastPlayed === "circle" ? "O" : "X";

      if (this.isWinner(alteredPositions)) {
        winner = this.state.nextPlayer;
        alert(`${this.state.nextPlayer} wins!`);
      }

      this.setState((prevState) => ({
        lastPlayed: lastPlayed,
        positions: alteredPositions,
        nextPlayer: nextPlayer,
        winner: winner,
      }));
    }
  }

  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>
          Next player: <span>{this.state.nextPlayer}</span>
        </div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          Winner: <span>{this.state.winner}</span>
        </div>
        <button style={buttonStyle} onClick={this.handleClickReset}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square
              position={0}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
            <Square
              position={1}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
            <Square
              position={2}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              position={3}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
            <Square
              position={4}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
            <Square
              position={5}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              position={6}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
            <Square
              position={7}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
            <Square
              position={8}
              positions={this.state.positions}
              onClick={this.handleClickSquare}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
