import Ship from "./ship";

const Gameboard = () => {
  const ships = [];
  const shots = [];

  const placeShip = (coords, length) => {
    ships.push(Ship(length, coords));
  };

  const removeShip = (ship) => {
    ships.splice(ships.findIndex(ship), 1);
  };

  const receiveAttack = (coord) => {
    const hitShip = ships.some((ship) =>
      ship.coords.some((shipCoord) => {
        if (coord === shipCoord) {
          ship.hit();
          if (ship.isSunk()) removeShip(ship);
          return true;
        }
        return false;
      })
    );
    if (!hitShip) shots.push(coord);
    return hitShip;
  };

  const allSunk = () => ships.length === 0;

  return { placeShip, receiveAttack, allSunk };
};

export default Gameboard;
