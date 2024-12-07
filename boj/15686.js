const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [n, m] = input[line++].split(" ").map(Number);

const arr = [];
const chickens = [];
const homes = [];

for (let i = 0; i < n; i++) {
  arr.push(input[line++].split(" ").map(Number));
  for (let j = 0; j < n; j++) {
    if (arr[i][j] === 1) {
      homes.push([i, j]);
    } else if (arr[i][j] === 2) {
      chickens.push([i, j]);
    }
  }
}

const selected = [];

class Queue {
  constructor() {
    this.items = {};
    this.header = 0;
    this.tail = 0;
  }

  push(item) {
    this.items[this.header++] = item;
  }

  pop() {
    const rv = this.items[this.tail];
    delete this.items[this.tail++];

    return rv;
  }

  isEmpty() {
    return this.header === this.tail;
  }
}

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

let ans = Number.MAX_SAFE_INTEGER;
const check = () => {
  const visited = [...new Array(n)].map(() => new Array(n).fill(0));
  const q = new Queue();

  selected.forEach((index) => {
    const [y, x] = chickens[index];

    q.push([y, x]);
    visited[y][x] = 1;
  });

  while (!q.isEmpty()) {
    const [nowY, nowX] = q.pop();

    for (let i = 0; i < 4; i++) {
      const nextY = nowY + dy[i];
      const nextX = nowX + dx[i];

      if (nextY >= n || nextY < 0 || nextX >= n || nextX < 0) continue;
      if (visited[nextY][nextX]) continue;

      q.push([nextY, nextX]);
      visited[nextY][nextX] = visited[nowY][nowX] + 1;
    }
  }

  const sum = homes.reduce((acc, cur) => {
    const [y, x] = cur;
    return acc + visited[y][x] - 1;
  }, 0);

  ans = Math.min(ans, sum);
};

const combi = (depth) => {
  if (selected.length === m) {
    check();

    return;
  }

  for (let i = depth; i < chickens.length; i++) {
    selected.push(i);
    combi(i + 1);
    selected.pop();
  }
};

combi(0);
console.log(ans);
