// cords [x, y]

// cords [d o 4, 5]

function getKnightPossibleMoves(fromCords) {
  const knightCordsX = fromCords[0];
  const knightCordsY = fromCords[1];

  if (
    knightCordsX > 7 ||
    knightCordsX < 0 ||
    knightCordsY > 7 ||
    knightCordsY < 0
  ) {
    throw new Error("You can't move out of the table");
  }

  posibleMoves = [
    [knightCordsX + 2, knightCordsY + 1],
    [knightCordsX + 2, knightCordsY - 1],
    [knightCordsX - 2, knightCordsY + 1],
    [knightCordsX - 2, knightCordsY - 1],
    [knightCordsX + 1, knightCordsY + 2],
    [knightCordsX - 1, knightCordsY + 2],
    [knightCordsX + 1, knightCordsY - 2],
    [knightCordsX - 1, knightCordsY - 2],
  ];

  const validMoves = posibleMoves.filter(([x, y]) => {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  });

  return validMoves;
}

function key([x, y]) {
  return `${x},${y}`;
}

function knightMoves(fromCords, toCords) {
  if (fromCords.length !== 2 || toCords.length !== 2) {
    throw new Error("The cords must be only x and y");
  }

  const queue = [fromCords];
  const visited = new Set([key(fromCords)]);
  const parent = {};

  while (queue.length > 0) {
    const current = queue.shift();

    if (areArraysEqual(current, toCords)) {
      const path =  buildPath(parent, fromCords, toCords);

      let text = `You made it in ${path.length - 1} moves! Here's the path:\n`
      for (const step of path) {
        text += `   [${step[0]}, ${step[1]}]\n`
      }

      return console.log(text);
    }

    for (const next of getKnightPossibleMoves(current)) {
      const k = key(next);
      if (!visited.has(k)) {
        visited.add(k);
        parent[k] = current;
        queue.push(next);
      }
    }
  }
}

const areArraysEqual = (arrA, arrB) => {
  const isLengthEqual = arrA.length === arrB.length;
  if (!isLengthEqual) {
    return false;
  }

  let isEqual = true;
  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }
  return isEqual;
};

function buildPath(parent, from, toCords) {
  const path = [toCords];
  let current = toCords;

  while (!areArraysEqual(current, from)) {
    current = parent[key(current)];
    path.push(current);
  }

  return path.reverse();
}



knightMoves([3,3],[4,3])
