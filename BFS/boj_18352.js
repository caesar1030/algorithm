const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m, k, x] = input[0].split(' ').map(Number);

const graph = Array.from(new Array(n + 1), () => []);
const visited = new Array(n + 1).fill(0);

for (let i = 0; i < m; i++) {
  const [a, b] = input[i + 1].split(' ').map(Number);
  graph[a].push(b);
}

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

const q = new Queue();

const bfs = (start) => {
  q.push(start);
  visited[start] = 1;

  while (!q.empty()) {
    const now = q.pop();
    for (const next of graph[now]) {
      if (visited[next]) continue;
      q.push(next);
      visited[next] = visited[now] + 1;
    }
  }
};

bfs(x);

const ans = visited.reduce((acc, cur, idx) => {
  if (cur - 1 !== k) return acc;

  return acc + idx + '\n';
}, '');

if (ans.length) console.log(ans);
else console.log(-1);
