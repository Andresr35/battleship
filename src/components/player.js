import Gameboard from "./gameboard";

const Player = (gameboard = Gameboard()) => {
  const sendAttack = (enemyGameboard, coord) => {
    enemyGameboard.recieveAttack(coord);
  };
  const sendRandomAttack = (enemyGameboard) => {};
  return { gameboard, sendAttack };
};

export default Player;
