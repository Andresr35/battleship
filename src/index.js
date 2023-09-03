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
  if (myPlayer.gameboard.allSunk()) {
    // write code here to show that computer won
    alert("computer won");
    startGame();
  } else if (computer.gameboard.allSunk()) {
    // write code here to show that the player won
    alert("player won");
    startGame();
  }
};

startGame = () => {
  document.querySelector(".container").replaceChildren();
  myPlayer.gameboard.renderGameboard(document.querySelector(".container"));
  computer.gameboard.renderCompGameboard(
    document.querySelector(".container"),
    () => {
      computer.sendRandomAttack(myPlayer.gameboard);
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

placeShipsPage(myPlayer);
