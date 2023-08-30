import "normalize.css";
import "./global.css";
import Player from "./components/player";
import Gameboard from "./components/gameboard";

// the player objects that get initialized by startGame
let myPlayer;
let computer;

const winGame = () => {
  if (myPlayer.gameboard.allSunk()) {
    // write code here to show that computer won
    alert("computer won");
  } else if (computer.gameboard.allSunk()) {
    // write code here to show that the player won
    alert("player won");
  }
};

const startGame = () => {
  const myGameboard = Gameboard();
  const computerGameboard = Gameboard();
  myPlayer = Player(myGameboard);
  computer = Player(computerGameboard);
  myPlayer.gameboard.renderGameboard(document.querySelector(".container"));
  computer.gameboard.renderCompGameboard(
    document.querySelector(".container"),
    () => {
      const res = computer.sendRandomAttack(myPlayer.gameboard);
      document.getElementById(`p[${res.coord}]`).innerText = "X";
    },
    winGame
  );
  myPlayer.gameboard.placeShip([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
  myPlayer.gameboard.placeShip([
    [3, 3],
    [4, 3],
    [5, 3],
  ]);
  myPlayer.gameboard.placeShip([
    [6, 7],
    [7, 7],
    [8, 7],
    [9, 7],
  ]);
  computer.gameboard.placeShip([
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
  ]);
  computer.gameboard.placeShip([
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
  ]);
  computer.gameboard.placeShip([
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
};

startGame();
