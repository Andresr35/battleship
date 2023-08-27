import Gameboard from "./gameboard";

const Player = (gameboard = Gameboard()) => {
  /**
   * Sends attack to gameboard, and will return whether it hit a ship or not
   *
   * @param   {Gameboard}       enemyGameboard
   * @param   {Array}  Gameboard       coordinates to send attack at
   *
   * @return  {boolean}                           return whether it hit a ship or not
   */
  const sendAttack = (enemyGameboard = Gameboard(), coord = []) =>
    enemyGameboard.receiveAttack(coord);

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
    const attack = legalMoves[Math.floor(Math.random()) * legalMoves.length];

    return sendAttack(enemyGameboard, attack);
  };
  return { gameboard, sendAttack, sendRandomAttack };
};

export default Player;
