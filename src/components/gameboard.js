import _ from "lodash";
import Ship from "./ship";

const Gameboard = () => {
  const ships = [];
  const shots = [];
  const illegalMoves = [];
  const getShots = () => shots;
  const getShips = () => ships;
  const getIllegalMoves = () => _.uniqWith(illegalMoves, _.isEqual());

  const getMovesAroundShip = (ship = Ship(3)) => {
    const offsets = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    let movesAroundShip = [];

    ship.coords.forEach((coord) => {
      const movesAroundCoord = offsets.map((offset) => {
        const x = coord[0] + offset[0];
        const y = coord[1] + offset[1];
        return [x, y];
      });
      movesAroundShip.push(...movesAroundCoord);
    });

    movesAroundShip = movesAroundShip.filter(
      (move) =>
        !ship.coords.some(
          (shipCoord) => shipCoord.toString() === move.toString()
        ) &&
        move[0] <= 10 &&
        move[0] >= 0 &&
        move[1] <= 10 &&
        move[1] >= 0
    );

    return _.uniqWith(movesAroundShip, _.isEqual);
  };

  const placeShip = (coords) => {
    ships.push(Ship(coords.length, coords));
  };

  const sinkShip = (ship) => {
    ships.splice(ships.indexOf(ship), 1);
    illegalMoves.push(...getMovesAroundShip(ship));
  };

  const receiveAttack = (coord) => {
    const hitShip = ships.some((ship) =>
      ship.coords.some((shipCoord) => {
        if (coord.toString() === shipCoord.toString()) {
          ship.hit();
          if (ship.isSunk()) sinkShip(ship);
          return true;
        }
        return false;
      })
    );
    if (!hitShip) shots.push(coord);
    illegalMoves.push(coord);
    return hitShip;
  };

  const allSunk = () => ships.length === 0;

  return {
    placeShip,
    receiveAttack,
    allSunk,
    getShots,
    getShips,
    getIllegalMoves,
  };
};

export default Gameboard;
