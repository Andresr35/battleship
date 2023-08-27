import Player from "../components/player";
import Gameboard from "../components/gameboard";

let myGameboard = Gameboard();
let computerGameboard = Gameboard();
const computer = Player(computerGameboard);

beforeEach(() => {
  myGameboard = Gameboard();
  myGameboard.placeShip([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);

  myGameboard.placeShip([
    [2, 1],
    [2, 2],
    [2, 3],
  ]);

  computerGameboard = Gameboard();

  computerGameboard.placeShip([
    [4, 1],
    [4, 2],
    [4, 3],
  ]);

  computerGameboard.placeShip([
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
});
