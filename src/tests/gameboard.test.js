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
  expect(myGameboard.getMissedShots()).toContainEqual([3, 3]);
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

test("should return illegal moves as none", () => {
  expect(myGameboard.getIllegalMoves().length).toBe(0);
});

test("should return illegal moves as 1, the one that hit", () => {
  myGameboard.receiveAttack([1, 1]);
  expect(myGameboard.getIllegalMoves()).toContainEqual([1, 1]);
});

test("should return illegal moves as 1, the one that missed", () => {
  myGameboard.receiveAttack([5, 5]);
  expect(myGameboard.getIllegalMoves()).toContainEqual([5, 5]);
});

test("should return illegal around ship", () => {
  myGameboard.placeShip([
    [5, 5],
    [5, 6],
    [5, 7],
  ]);
  const shouldHave = [
    [5, 4],
    [5, 8],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
    [6, 8],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [4, 8],
    [5, 5],
    [5, 6],
    [5, 7],
  ];
  myGameboard.receiveAttack([5, 5]);
  myGameboard.receiveAttack([5, 6]);
  myGameboard.receiveAttack([5, 7]);

  shouldHave.map((move) =>
    expect(myGameboard.getIllegalMoves()).toContainEqual(move)
  );
});

test("should return illegal moves not including out of bounds", () => {
  myGameboard.placeShip([
    [8, 0],
    [9, 0],
    [7, 0],
  ]);
  myGameboard.receiveAttack([8, 0]);
  myGameboard.receiveAttack([9, 0]);
  myGameboard.receiveAttack([7, 0]);
  const shouldHave = [
    [7, 0],
    [8, 0],
    [9, 0],
    [7, 1],
    [8, 1],
    [9, 1],
    [6, 1],
    [6, 0],
  ];
  const shouldntHave = [
    [7, -1],
    [8, -1],
    [9, -1],
    [10, -1],
    [11, 0],
  ];
  shouldHave.map((move) =>
    expect(myGameboard.getIllegalMoves()).toContainEqual(move)
  );
  shouldntHave.map((move) =>
    expect(myGameboard.getIllegalMoves()).not.toContainEqual(move)
  );
});
