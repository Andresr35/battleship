const Ship = (length = 3, coords = [[]]) => {
  let timesHit = 0;
  const sunk = false;
  const hit = () => {
    timesHit += 1;
  };
  const isSunk = () => length === timesHit;
  return { length, timesHit, sunk, hit, isSunk, coords };
};

export default Ship;
