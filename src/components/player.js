import Gameboard from "./gameboard";

const Player = (gameboard = Gameboard()) => {
  const sendAttack = (enemyGameboard, coord) => {
    enemyGameboard.recieveAttack(coord);
  };
  const sendRandomAttack = (enemyGameboard = Gameboard()) => {
    const legalMoves = [];
    const illegalMoves = enemyGameboard.getIllegalMoves();
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const isIllegal = illegalMoves.some(
          (illegalMove) => illegalMove.toString() === [i, j].toString()
        );
        if (!isIllegal) legalMoves.push([i, j]);
      }
    }

    enemyGameboard.receiveAttack(
      legalMoves[Math.floor(Math.random()) * legalMoves.length]
    );
  };
  return { gameboard, sendAttack, sendRandomAttack };
};

export default Player;
