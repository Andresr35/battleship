import "normalize.css";
import "./global.css";
import Player from "./components/player";
import Gameboard from "./components/gameboard";

// the player objects that get initialized by startGame
let myPlayer;
let computer;
let turn = myPlayer;

const switchTurn = () => {
  if (turn === myPlayer) {
    turn = computer;
  } else {
    turn = myPlayer;
  }
};

const handleTurn = (e) => {
  e.preventDefault();
  console.log(e.target.id);
  console.log(myPlayer.sendAttack(computer.gameboard, e.target.id));
};

const startGame = () => {
  const myGameboard = Gameboard();
  const computerGameboard = Gameboard();
  myPlayer = Player(myGameboard);
  computer = Player(computerGameboard);
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

const renderGameboards = (container) => {
  const playerLabel = container.appendChild(document.createElement("span"));
  playerLabel.innerHTML = "Player";
  const computerLabel = container.appendChild(document.createElement("span"));
  computerLabel.innerHTML = "Computer";
  const playerGameboardContainer = container.appendChild(
    document.createElement("div")
  );
  const computerGameboardContainer = container.appendChild(
    document.createElement("div")
  );

  for (let i = 99; i >= 0; i -= 1) {
    const square = computerGameboardContainer.appendChild(
      document.createElement("div")
    );
    square.addEventListener("click", handleTurn, {
      once: true,
    });

    square.id = `[${i < 10 ? i : i % 10},${i < 10 ? "0" : Math.floor(i / 10)}]`;
    playerGameboardContainer.appendChild(document.createElement("div"));
  }
};

startGame();
renderGameboards(document.querySelector(".container"));
