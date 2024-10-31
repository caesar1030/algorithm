const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [n, m] = input[line++].split(" ").map(Number);
const arr = [];

class Queue {
  constructor() {
    this.items = {};
    this.header = 0;
    this.tail = 0;
  }

  pop() {
    const rv = this.items[this.header];
    delete this.items[this.header++];

    return rv;
  }

  push(item) {
    this.items[this.tail++] = item;
  }

  isEmpty() {
    return this.header === this.tail;
  }
}

for (let i = 0; i < n; i++) {
  const row = input[line++].split(" ").map(Number);
  arr.push(row);
}

const dominate = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (arr[i][j] === 2) {
      dominate.push({
        row: i,
        col: j,
      });
    }
  }
}

const selected = [];

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

const bfs = () => {
  const q = new Queue();
  const visited = [...new Array(n)].map(() => new Array(n).fill(0));
  for (let i = 0; i < selected.length; i++) {
    q.push(selected[i]);
    visited[selected[i].row][selected[i].col] = 1;
  }

  let rv = 0;
  while (!q.isEmpty()) {
    const { row: nowY, col: nowX } = q.pop();

    for (let i = 0; i < 4; i++) {
      const ny = nowY + dy[i];
      const nx = nowX + dx[i];

      if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
      if (visited[ny][nx]) continue;

      q.push({ row: ny, col: nx });
      visited[ny][nx] = visited[nowY][nowX] + 1;
      if (arr[ny][nx] === 1) {
        rv += visited[ny][nx] - 1;
      }
    }
  }

  return rv;
};

let ans = 987654321;
const select = (depth) => {
  if (selected.length === m) {
    const rv = bfs();

    ans = Math.min(ans, rv);
    return;
  }
  for (let i = depth; i < dominate.length; i++) {
    selected.push(dominate[i]);
    select(i + 1);
    selected.pop();
  }
};

select(0);

console.log(ans);
