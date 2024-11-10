const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [r, c] = input[line++].split(" ").map(Number);

class Queue {
  constructor() {
    this.items = {};
    this.header = 0;
    this.tail = 0;
  }

  pop() {
    const rv = this.items[this.tail];
    delete this.items[this.tail++];

    return rv;
  }

  push(item) {
    this.items[this.header++] = item;
  }

  isEmpty() {
    return this.header === this.tail;
  }
}

const q = new Queue();
const arr = [];
const visited = [...new Array(r)].map(() => new Array(c).fill(0));
const temp = [];

for (let i = 0; i < r; i++) {
  const row = input[line++];
  arr.push(row);
  for (let j = 0; j < c; j++) {
    if (row[j] === "J") {
      temp.push([i, j]);
      visited[i][j] = 1;
    }

    if (row[j] === "F") {
      q.push([i, j]);
      visited[i][j] = -1;
    }
  }
}

temp.forEach((coord) => q.push(coord));

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

let ans = Number.MAX_SAFE_INTEGER;
while (!q.isEmpty()) {
  const [nowY, nowX] = q.pop();
  if (nowY === 0 || nowY === r - 1 || nowX === 0 || nowX === c - 1) {
    if (visited[nowY][nowX] > 0) {
      ans = Math.min(ans, visited[nowY][nowX]);
    }
  }

  for (let i = 0; i < 4; i++) {
    const nextY = nowY + dy[i];
    const nextX = nowX + dx[i];

    if (nextY < 0 || nextY >= r || nextX < 0 || nextX >= c) continue;
    if (visited[nextY][nextX] !== 0) continue;
    if (arr[nextY][nextX] === "#") continue;
    q.push([nextY, nextX]);
    const dir = visited[nowY][nowX] > 0 ? 1 : -1;
    visited[nextY][nextX] = visited[nowY][nowX] + 1 * dir;
  }
}

if (ans === Number.MAX_SAFE_INTEGER) {
  console.log("IMPOSSIBLE");
} else {
  console.log(ans);
}
