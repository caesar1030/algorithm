const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

class Queue {
  constructor() {
    this.head = 0;
    this.tail = 0;
    this.items = {};
  }

  push(item) {
    this.items[this.tail++] = item;
  }

  pop() {
    const rv = this.items[this.head];
    delete this.items[this.head++];

    return rv;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const [n, k] = input[line++].split(' ').map(Number);
const arr = [...new Array(n)].map(() => new Array(n).fill(0));
const visited = [...new Array(n)].map(() => new Array(n).fill(false));

// type {y,x,val, time}[];
const temp = [];
for (let i = 0; i < n; i++) {
  arr[i] = input[line++].split(' ').map(Number);
  for (let j = 0; j < n; j++) {
    if (arr[i][j]) temp.push({ y: i, x: j, val: arr[i][j], time: 0 });
  }
}

const [s, x, y] = input[line++].split(' ').map(Number);

// bfs

temp.sort((a, b) => a.val - b.val);

const q = new Queue();
temp.forEach((el) => {
  visited[el.y][el.x] = true;
  q.push(el);
});

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

while (!q.isEmpty()) {
  const { y: nowR, x: nowC, val, time } = q.pop();

  if (nowR === x - 1 && nowC === y - 1) {
    if (time <= s) {
      console.log(val);
    } else {
      console.log(0);
    }
    break;
  }

  for (let i = 0; i < 4; i++) {
    const nextR = nowR + dy[i];
    const nextC = nowC + dx[i];

    if (nextR < 0 || nextR >= n || nextC < 0 || nextC >= n) continue;
    if (visited[nextR][nextC] || arr[nextR][nextC] !== 0) continue;

    visited[nextR][nextC] = true;
    arr[nextR][nextC] = val;
    q.push({ y: nextR, x: nextC, val, time: time + 1 });
  }
}
