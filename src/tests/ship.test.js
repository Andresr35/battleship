import Ship from "../components/ship";

test("should hit 3 times the ship and sink", () => {
  const myShip = Ship(3, [1, 1]);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});
