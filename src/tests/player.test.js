import Player from "../components/player";
import Gameboard from "../components/gameboard";

let myGameboard = Gameboard();
let computerGameboard = Gameboard();
const computer = Player(computerGameboard);
const myPlayer = Player(myGameboard);

beforeEach(() => {
  myGameboard = Gameboard();
  myPlayer.gameboard.placeShip([
    [0, 1],
    [0, 2],
    [0, 3],
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

test("should attack computer Gameboard and return true", () => {
  expect(myPlayer.sendAttack(computerGameboard, [5, 2])).toBe(true);
});

test("should attack myplayer gameboard at [2,2] and return true ", () => {
  const moves = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (i !== 2 || j !== 2) moves.push([i, j]);
    }
  }
  moves.forEach((move) => computer.sendAttack(myGameboard, move));

  expect(computer.sendRandomAttack(myGameboard)).toBe(true);
});
