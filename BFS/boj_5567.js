const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const m = +input[1];

const graph = Array.from(new Array(n + 1), () => []);
const visited = new Array(n + 1).fill(0);

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

for (let i = 0; i < m; i++) {
  const [a, b] = input[i + 2].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const q = new Queue();
const bfs = () => {
  q.push(1);
  visited[1] = 1;

  while (!q.empty()) {
    const now = q.pop();

    for (let next of graph[now]) {
      if (visited[next]) continue;

      if (visited[now] <= 2) {
        q.push(next);
        visited[next] = visited[now] + 1;
      }
    }
  }
};

bfs();
console.log(visited.filter((val) => val > 0).length - 1);
