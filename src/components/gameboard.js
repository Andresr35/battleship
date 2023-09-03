import _ from "lodash";
import Ship from "./ship";

/**
 * Gameboard for each player
 *
 */
const Gameboard = () => {
  const ships = [];
  const shots = []; // any missed shots
  const illegalMoves = []; // all shots
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
   * If it hit a ship will return true and will change class to hit
   * as well as change inner text to x
   *
   * @param   {Array}  coord  coord that gameboard will be hit at
   *
   * @return  {boolean}         boolean of whether it hit a ship or not
   */
  const receiveAttack = (coord, name) => {
    const hitShip = ships.some((ship) =>
      ship.coords.some((shipCoord) => {
        if (coord.toString() === shipCoord.toString()) {
          // checks to see if ship coord was hit
          ship.hit();
          document.querySelector(
            `.${name}Gameboard ._${coord[0]}_${coord[1]}`
          ).innerHTML = "X";
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

  const renderCompGameboard = (container, computerTurn, checkForWin) => {
    const computerGameboardContainer = container.appendChild(
      document.createElement("div")
    );
    computerGameboardContainer.classList.add("computerGameboard");
    for (let i = 99; i >= 0; i -= 1) {
      const square = computerGameboardContainer.appendChild(
        document.createElement("div")
      );

      square.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const coord = JSON.parse(
            `[${e.target.className[1]},${e.target.className[3]}]`
          );
          receiveAttack(coord, "computer");
          computerTurn(); // callback
          checkForWin();
        },
        { once: true }
      );
      square.className = `_${i < 10 ? i : i % 10}_${
        i < 10 ? "0" : Math.floor(i / 10)
      }`;
    }
  };

  const renderGameboard = (container) => {
    const playerGameboardContainer = container.appendChild(
      document.createElement("div")
    );
    playerGameboardContainer.classList.add("playerGameboard");
    for (let i = 99; i >= 0; i -= 1) {
      const square = document.createElement("div");
      playerGameboardContainer.appendChild(square);
      square.className = `_${i < 10 ? i : i % 10}_${
        i < 10 ? "0" : Math.floor(i / 10)
      }`;
      square.ondrop = (e) => {
        // Want to set the coordinate as the first in however much the length
        // and the length can not be [x]+length<=10
        const coord = [];
        e.preventDefault();
        square.classList.remove("dropZone");
        const data = e.dataTransfer.getData("text"); // this is gonna be the type of ship
        if (data === "carrier") {
          if (5 + parseInt(e.target.classList.value[1], 10) <= 10) {
            let currentSquare = square;
            for (let j = 0; j < 5; j += 1) {
              currentSquare.classList.add("selected");
              currentSquare = currentSquare.previousElementSibling;
              coord.push([
                parseInt(currentSquare.classList.value[1], 10),
                parseInt(currentSquare.classList.value[3], 10),
              ]);
            }
          }
        } else if (data === "destroyer") {
          if (4 + parseInt(e.target.classList.value[1], 10) <= 10) {
            let currentSquare = square;
            for (let j = 0; j < 4; j += 1) {
              currentSquare.classList.add("selected");
              currentSquare = currentSquare.previousElementSibling;
              coord.push([
                parseInt(currentSquare.classList.value[1], 10),
                parseInt(currentSquare.classList.value[3], 10),
              ]);
            }
          }
        } else if (data === "patrol") {
          if (3 + parseInt(e.target.classList.value[1], 10) <= 10) {
            let currentSquare = square;
            for (let j = 0; j < 3; j += 1) {
              currentSquare.classList.add("selected");
              currentSquare = currentSquare.previousElementSibling;
              coord.push([
                parseInt(currentSquare.classList.value[1], 10),
                parseInt(currentSquare.classList.value[3], 10),
              ]);
            }
          }
        } else if (data === "battleship") {
          if (2 + parseInt(e.target.classList.value[1], 10) <= 10) {
            let currentSquare = square;
            for (let j = 0; j < 2; j += 1) {
              currentSquare.classList.add("selected");
              currentSquare = currentSquare.previousElementSibling;
              coord.push([
                parseInt(currentSquare.classList.value[1], 10),
                parseInt(currentSquare.classList.value[3], 10),
              ]);
            }
          }
        }
        placeShip(coord);
      };
      square.ondragover = (e) => {
        e.preventDefault();
      };
      square.ondragenter = (e) => {
        e.preventDefault();
        square.classList.add("dropZone");
      };
      square.ondragleave = (e) => {
        e.preventDefault();
        square.classList.remove("dropZone");
      };
    }
  };

  return {
    placeShip,
    receiveAttack,
    allSunk,
    getMissedShots,
    getShips,
    getIllegalMoves,
    renderGameboard,
    renderCompGameboard,
  };
};

export default Gameboard;
