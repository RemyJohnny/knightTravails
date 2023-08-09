/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-plusplus */
// NODE FACTORY
const NODE = ([x, y]) => {
  const node = { value: `[${x}, ${y}]`, prev: null };
  return node;
};

const makeBoard = () => {
  const Board = [];
  for (let i = 0; i < 8; i += 1) {
    Board[i] = [];
    for (let j = 0; j < 8; j += 1) {
      Board[i][j] = `[${i}, ${j}]`;
    }
  }
  return Board;
};

const Queue = [];
const visited = new Set();

const getLegalMoves = ([x, y], board = makeBoard()) => {
  for (let i = 0; i < board.length; ++i) {
    board[i] = board[i].filter(
      (move) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        move === `[${x + 1}, ${y + 2}]` ||
        move === `[${x + 2}, ${y + 1}]` ||
        move === `[${x - 1}, ${y + 2}]` ||
        move === `[${x - 2}, ${y - 1}]` ||
        move === `[${x + 1}, ${y - 2}]` ||
        move === `[${x + 2}, ${y - 1}]` ||
        move === `[${x - 1}, ${y - 2}]` ||
        move === `[${x - 2}, ${y + 1}]`
    );
  }
  board = board.flat();
  return board;
};

const bfsAlgo = (node, end) => {
  // base case
  if (node.value === NODE(end).value) return node;

  visited.add(Queue.shift().value);
  const neighbors = getLegalMoves(JSON.parse(node.value));

  // explore all the neighbors of the node
  neighbors.forEach((neighbor) => {
    neighbor = { value: neighbor, prev: node };
    // checks if any of the neighbors has been visited
    if (!visited.has(neighbor.value)) {
      Queue.push(neighbor);
    }
  });

  return bfsAlgo(Queue[0], end);
};

const knightMoves = (start, end) => {
  if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
    return "Out of range, please enter start and end points between [0, 0] and [7, 7]";
  }
  Queue.push(NODE(start));
  let path = bfsAlgo(Queue[0], end);
  const output = [];
  output.push(path.value);
  while (path.prev !== null) {
    output.unshift(path.prev.value);
    path = path.prev;
  }
  console.log(`Here is your path from ${start} to ${end}`);
  output.forEach((move) => console.log(move));
};

console.log(knightMoves([3, 3], [4, 3]));
