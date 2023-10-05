const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let line = 0;
const n = +input[line++];
const graph = Array.from(new Array(n), () => new Array(n).fill(0));
const visited = Array.from(new Array(n), () => new Array(n).fill(false));

const k = +input[line++];

for (let i = 0; i < k; i++) {
  const [y, x] = input[line].split(' ').map(Number);
  line++;
  graph[y - 1][x - 1] = 1;
}

const l = +input[line++];

const directionChanges = new Map();
for (let i = 0; i < l; i++) {
  const [time, direction] = input[line].split(' ');
  line++;
  directionChanges.set(+time, direction);
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
    const item = this.items[this.header];
    delete this.items[this.header++];

    return item;
  }

  isEmpty() {
    return this.header === this.tail;
  }
}

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];
let directionIdx = 0;

const q = new Queue();
const bodyQ = new Queue();
let time = 0;
const bfs = () => {
  q.push([0, 0]);
  visited[0][0] = true;
  bodyQ.push([0, 0]);

  while (!q.isEmpty()) {
    const [y, x] = q.pop();

    if (directionChanges.has(time)) {
      const direction = directionChanges.get(time);
      const temp = direction === 'L' ? -1 : 1;
      directionIdx = (directionIdx + temp + 4) % 4;
    }
    time++;

    const ny = y + dy[directionIdx];
    const nx = x + dx[directionIdx];

    if (ny < 0 || ny >= n || nx < 0 || nx >= n) break;
    if (visited[ny][nx]) break;

    if (graph[ny][nx]) {
      q.push([ny, nx]);
      visited[ny][nx] = true;
      bodyQ.push([ny, nx]);

      graph[ny][nx] = 0;
    } else {
      q.push([ny, nx]);
      visited[ny][nx] = true;
      bodyQ.push([ny, nx]);

      const [ty, tx] = bodyQ.pop();
      visited[ty][tx] = false;
    }
  }
};

bfs();
console.log(time);
