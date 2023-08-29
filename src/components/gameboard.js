import _ from "lodash";
import Ship from "./ship";

/**
 * Gameboard for each player
 *
 */
const Gameboard = () => {
  const ships = [];
  const shots = []; // any missed shots
  const illegalMoves = [];
  const getMissedShots = () => shots;
  const getShips = () => ships;
  const getIllegalMoves = () => _.uniqWith(illegalMoves, _.isEqual);

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
        move[0] < 10 &&
        move[0] >= 0 &&
        move[1] < 10 &&
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

  /**
   * Grabs the coord and checks to see if it hit a ship.
   * If it hit a ship will return true
   *
   * @param   {Array}  coord  coord that gameboard will be hit at
   *
   * @return  {boolean}         boolean of whether it hit a ship or not
   */
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
    getMissedShots,
    getShips,
    getIllegalMoves,
  };
};

export default Gameboard;
