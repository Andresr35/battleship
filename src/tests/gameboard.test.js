import Gameboard from "../components/gameboard";

let myGameboard = Gameboard();

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
});

test("should hit ship", () => {
  expect(myGameboard.receiveAttack([1, 3])).toBe(true);
});

test("should miss ship", () => {
  expect(myGameboard.receiveAttack([1, 4])).toBe(false);
});

test("should be length of 2 ships", () => {
  expect(myGameboard.getShips().length).toBe(2);
});

test("should sink ship and remove", () => {
  myGameboard.receiveAttack([2, 1]);
  myGameboard.receiveAttack([2, 2]);
  myGameboard.receiveAttack([2, 3]);
  expect(myGameboard.getShips().length).toBe(1);
});

test("should return missed shot at [3,3] in array", () => {
  myGameboard.receiveAttack([3, 3]);
  expect(myGameboard.getShots()).toContainEqual([3, 3]);
});
test("should return if all ships are sunk, false", () => {
  expect(myGameboard.allSunk()).toBe(false);
});

test("should hit all ships and return true for all ships sunk", () => {
  myGameboard.receiveAttack([2, 1]);
  myGameboard.receiveAttack([2, 2]);
  myGameboard.receiveAttack([2, 3]);
  myGameboard.receiveAttack([1, 1]);
  myGameboard.receiveAttack([1, 2]);
  myGameboard.receiveAttack([1, 3]);
  expect(myGameboard.allSunk()).toBe(true);
});
