const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = new Array(n);

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

class Queue {
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
  graph[i] = input[i + 1].split(' ').map(Number);
}

const q = new Queue();

const bfs = () => {
  const visited = Array.from(new Array(n), () => new Array(m).fill(false));
  q.push([0, 0]);
  visited[0][0] = true;

  while (!q.empty()) {
    const [y, x] = q.pop();

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
      if (graph[ny][nx]) graph[ny][nx]++;
      else if (!visited[ny][nx]) {
        q.push([ny, nx]);
        visited[ny][nx] = true;
      }
    }
  }
};

const melt = () => {
  let isEmpty = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!graph[i][j]) continue;
      if (graph[i][j] >= 3) {
        graph[i][j] = 0;
      } else {
        graph[i][j] = 1;
      }
      isEmpty = false;
    }
  }

  return isEmpty;
};

const print = () => {
  console.log(
    graph.reduce((acc, cur) => {
      return acc + cur.join(' ') + '\n';
    }, '')
  );
};

let time = 0;
while (true) {
  bfs();

  if (melt()) {
    console.log(time);
    break;
  }

  ++time;
}
