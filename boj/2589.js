const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [n, m] = input[line++].split(" ").map(Number);

const arr = [];

for (let i = 0; i < n; i++) {
  arr.push(input[line++].split(""));
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

let ans = Number.MIN_SAFE_INTEGER;

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (arr[i][j] !== "L") continue;

    const visited = [...new Array(n)].map(() => new Array(m).fill(0));
    const q = new Queue();

    q.push([i, j]);
    visited[i][j] = 1;

    while (!q.isEmpty()) {
      const [nowY, nowX] = q.pop();

      for (let i = 0; i < 4; i++) {
        const nextY = nowY + dy[i];
        const nextX = nowX + dx[i];

        if (nextY >= n || nextY < 0 || nextX >= m || nextX < 0) continue;
        if (visited[nextY][nextX] || arr[nextY][nextX] !== "L") continue;

        q.push([nextY, nextX]);
        visited[nextY][nextX] = visited[nowY][nowX] + 1;
        ans = Math.max(visited[nextY][nextX] - 1, ans);
      }
    }
  }
}

console.log(ans);
