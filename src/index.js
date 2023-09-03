import "normalize.css";
import "./global.css";
import Player from "./components/player";
import Gameboard from "./components/gameboard";
import Carrier from "./images/carrier.svg";
import Destroyer from "./images/destroyer.svg";
import Patrol from "./images/patrol.svg";
import Battleship from "./images/battleship.svg";

// the player objects that get initialized by startGame

let startGame = null;

let myGameboard = Gameboard();
let computerGameboard = Gameboard();
const myPlayer = Player(myGameboard);
const computer = Player(computerGameboard);

const onDragStart = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};
const onDragOver = (e) => {
  e.preventDefault();
};

const placeShipsPage = (player = Player()) => {
  myGameboard = Gameboard();
  computerGameboard = Gameboard();
  const container = document.querySelector(".shipContainer");
  player.gameboard.renderGameboard(document.querySelector(".container"));

  const carrier = container.appendChild(new Image());
  carrier.src = Carrier;
  carrier.id = "carrier";
  carrier.ondragstart = onDragStart;
  carrier.ondragover = onDragOver;

  const destroyer = container.appendChild(new Image());
  destroyer.src = Destroyer;
  destroyer.id = "destroyer";
  destroyer.ondragstart = onDragStart;
  destroyer.ondragover = onDragOver;

  const patrol = container.appendChild(new Image());
  patrol.src = Patrol;
  patrol.id = "patrol";
  patrol.ondragstart = onDragStart;
  patrol.ondragover = onDragOver;

  const battleship = container.appendChild(new Image());
  battleship.src = Battleship;
  battleship.id = "battleship";
  battleship.ondragstart = onDragStart;
  battleship.ondragover = onDragOver;
  const button = container.appendChild(document.createElement("button"));
  button.innerText = "Finish";

  button.onclick = () => {
    startGame();
  };
};

const winGame = () => {
  const winGameMessage = document.createElement("span");
  const container = document.querySelector(".container");

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset";
  resetButton.onclick = () => {
    container.replaceChildren();
    placeShipsPage();
  };
  if (myPlayer.gameboard.allSunk()) {
    // write code here to show that computer won
    container.appendChild(winGameMessage);
    winGameMessage.innerText = "Computer has Won!";
    container.appendChild(resetButton);
  } else if (computer.gameboard.allSunk()) {
    container.appendChild(winGameMessage);
    // write code here to show that the player won
    winGameMessage.innerText = "Player has won";
    container.appendChild(resetButton);
  }
};

startGame = () => {
  const container = document.querySelector(".container");
  container.replaceChildren();
  document.querySelector(".shipContainer").replaceChildren();
  const playerSpan = container.appendChild(document.createElement("span"));
  const computerSpan = container.appendChild(document.createElement("span"));
  playerSpan.innerText = "Player";
  computerSpan.innerText = "Computer";
  myPlayer.gameboard.renderGameboard(container);
  computer.gameboard.renderCompGameboard(
    container,
    () => {
      computer.sendRandomAttack(myPlayer.gameboard);
    },
    winGame
  );

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

placeShipsPage(myPlayer);
