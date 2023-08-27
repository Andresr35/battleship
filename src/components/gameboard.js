import Ship from "./ship";

const Gameboard = () => {
  const ships = [];
  const shots = [];
  const getShots = () => shots;
  const getShips = () => ships;

  const placeShip = (coords) => {
    ships.push(Ship(coords.length, coords));
  };

  const removeShip = (ship) => {
    ships.splice(ships.indexOf(ship), 1);
  };

  const receiveAttack = (coord) => {
    const hitShip = ships.some((ship) =>
      ship.coords.some((shipCoord) => {
        if (coord.toString() === shipCoord.toString()) {
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

  return { placeShip, receiveAttack, allSunk, getShots, getShips };
};

export default Gameboard;
