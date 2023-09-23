const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, l, r] = input[0].split(' ').map(Number);
const graph = new Array(n);

for (let i = 0; i < n; i++) {
  graph[i] = input[i + 1].split(' ').map(Number);
}

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
    const item = this.items[this.tail];
    delete this.items[this.tail++];

    return item;
  }

  empty() {
    return this.header === this.tail;
  }
}

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

let ans = 0;
while (true) {
  const visited = Array.from(new Array(n), () => new Array(n).fill(false));
  const q = new Queue();

  const bfs = (sr, sc) => {
    let sum = 0;
    let party = [];

    q.push([sr, sc]);
    visited[sr][sc] = true;
    sum += graph[sr][sc];
    party.push([sr, sc]);

    let isClosed = true;
    while (!q.empty()) {
      const [y, x] = q.pop();
      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
        if (visited[ny][nx]) continue;
        if (
          Math.abs(graph[ny][nx] - graph[y][x]) < l ||
          Math.abs(graph[ny][nx] - graph[y][x]) > r
        )
          continue;
        q.push([ny, nx]);
        visited[ny][nx] = true;
        sum += graph[ny][nx];
        party.push([ny, nx]);

        isClosed = false;
      }
    }

    const val = ~~(sum / party.length);

    party.forEach((dot) => {
      const [r, c] = dot;
      graph[r][c] = val;
    });

    return isClosed;
  };

  let isClosed2 = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      if (!bfs(i, j)) isClosed2 = false;
    }
  }

  if (isClosed2) {
    console.log(ans);
    break;
  }
  ++ans;
}
