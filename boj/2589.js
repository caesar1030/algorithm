const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [row, col] = input[line++].split(" ").map(Number);

const arr = [];
for (let i = 0; i < row; i++) {
  const temp = input[line++];
  arr.push(temp);
}

class Queue {
  constructor() {
    this.items = {};
    this.header = 0;
    this.tail = 0;
  }

  push(item) {
    this.items[this.tail++] = item;
  }

  pop() {
    const rv = this.items[this.header];
    delete this.items[this.header++];

    return rv;
  }

  isEmpty() {
    return this.header === this.tail;
  }
}

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

const bfs = (y, x) => {
  const visited = [...new Array(row)].map(() => new Array(col).map(() => 0));

  const q = new Queue();
  q.push([y, x]);
  visited[y][x] = 1;
  let rv = 1;

  while (!q.isEmpty()) {
    const [nowY, nowX] = q.pop();

    for (let i = 0; i < 4; i++) {
      const nextY = nowY + dy[i];
      const nextX = nowX + dx[i];

      if (nextY >= row || nextY < 0 || nextX >= col || nextX < 0) continue;
      if (visited[nextY][nextX]) continue;
      if (arr[nextY][nextX] !== "L") continue;

      q.push([nextY, nextX]);
      visited[nextY][nextX] = visited[nowY][nowX] + 1;
      rv = Math.max(ans, visited[nextY][nextX]);
    }
  }

  return rv;
};

let ans = 1;
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    if (arr[i][j] === "L") {
      ans = Math.max(ans, bfs(i, j));
    }
  }
}

console.log(ans - 1);
