import Carrier from "../images/carrier.svg";
import Destroyer from "../images/destroyer.svg";
import Patrol from "../images/patrol.svg";
import Battleship from "../images/battleship.svg";

const Ship = (length = 3, coords = [[]]) => {
  let timesHit = 0;
  const shipImage = new Image();
  const sunk = false;

  const hit = () => {
    timesHit += 1;
  };

  const getShipImage = () => shipImage;

  const isSunk = () => length === timesHit;

  switch (length) {
    case 2:
      shipImage.src = Patrol;
      break;
    case 3:
      shipImage.src = Destroyer;
      break;
    case 4:
      shipImage.src = Battleship;
      break;
    case 5:
      shipImage.src = Carrier;
      break;
    default:
      throw new Error("Not a correct length for battleship");
  }

  return { length, timesHit, sunk, hit, isSunk, coords, getShipImage };
};

export default Ship;
