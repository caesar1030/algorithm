const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let line = 0;
let t = +input[line];

class Queue {
  constructor() {
    this.items = {};
    this.header = 0;
    this.tail = 0;
  }

  push(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  pop() {
    const item = this.items[this.header];
    delete this.items[this.header];
    this.header++;

    return item;
  }

  empty() {
    return this.header === this.tail;
  }
}

const dy = [-2, -1, 1, 2, 2, 1, -1, -2];
const dx = [-1, -2, -2, -1, 1, 2, 2, 1];

while (t--) {
  const l = +input[++line];
  const s = input[++line].split(' ').map(Number);
  const d = input[++line].split(' ').map(Number);

  const graph = Array.from(new Array(l), () => new Array(l).fill(0));
  const q = new Queue();

  const bfs = (start) => {
    const [r, c] = start;

    q.push(start);
    graph[r][c] = 1;

    while (!q.empty()) {
      const [y, x] = q.pop();
      if (y === d[0] && x === d[1]) break;

      for (let i = 0; i < 8; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny >= l || nx < 0 || nx >= l) continue;
        if (graph[ny][nx]) continue;

        q.push([ny, nx]);
        graph[ny][nx] = graph[y][x] + 1;
      }
    }
  };

  bfs(s);
  console.log(graph[d[0]][d[1]] - 1);
}
