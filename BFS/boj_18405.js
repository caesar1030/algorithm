const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, k] = input[0].split(' ').map(Number);
const [s, x, y] = input[n + 1].split(' ').map(Number);

const graph = Array.from(new Array(n), () => new Array(n).fill(0));
const visited = Array.from(new Array(n), () => new Array(n).fill(0));
const viruses = [];

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

class Q {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.items[this.tail++] = item;
  }

  pop() {
    const item = this.items[this.head];
    delete this.items[this.head++];

    return item;
  }

  empty() {
    return this.head === this.tail;
  }
}

for (let i = 0; i < n; i++) {
  input[i + 1].split(' ').map((val, j) => {
    const num = Number(val);
    graph[i][j] = num;

    if (graph[i][j]) {
      viruses.push({ i, j, num });
    }
  });
}

const q = new Q();

viruses
  .sort((a, b) => {
    if (a.num < b.num) return -1;
    else if (a.num > b.num) return 1;
    else return 0;
  })
  .forEach((virus) => {
    q.push(virus);
  });

while (!q.empty()) {
  const { i, j, num } = q.pop();

  for (let w = 0; w < 4; w++) {
    const ny = i + dy[w];
    const nx = j + dx[w];

    if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
    if (graph[ny][nx]) continue;
    if (visited[ny][nx]) continue;

    if (visited[i][j] + 1 <= s) {
      q.push({ i: ny, j: nx, num: num });
      visited[ny][nx] = visited[i][j] + 1;
      graph[ny][nx] = num;
    }
  }
}

console.log(graph[x - 1][y - 1]);
