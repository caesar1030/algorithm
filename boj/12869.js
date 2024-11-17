const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const n = +input[line++];
const scv = input[line++].split(" ").map(Number);

const arr = [...new Array(61)].map(() => {
  const temp = [...new Array(61)].map(() => new Array(61).fill(0));

  return temp;
});

const d = [
  [9, 3, 1],
  [9, 1, 3],
  [3, 9, 1],
  [3, 1, 9],
  [1, 9, 3],
  [1, 3, 9],
];

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

const q = new Queue();

const t = [0, 0, 0];
scv.map((val, idx) => (t[idx] = val));
q.push(t);
arr[t[0]][t[1]][t[2]] = 1;

while (!q.isEmpty()) {
  const now = q.pop();

  for (let i = 0; i < 6; i++) {
    const next = now.map((val, idx) => Math.max(val - d[i][idx], 0));

    if (arr[next[0]][next[1]][next[2]]) continue;

    q.push([next[0], next[1], next[2]]);
    arr[next[0]][next[1]][next[2]] = arr[now[0]][now[1]][now[2]] + 1;
  }
}

console.log(arr[0][0][0] - 1);
