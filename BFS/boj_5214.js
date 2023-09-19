const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, k, m] = input[0].split(' ').map(Number);
const graph = Array.from(new Array(n + m + 1), () => []);
const visited = Array(n + m + 1).fill(0);

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

let hyper = n + 1;
for (let i = 1; i <= m; i++) {
  const arr = input[i].split(' ').map(Number);
  arr.forEach((val) => {
    graph[hyper].push(val);
    graph[val].push(hyper);
  });

  hyper++;
}

const q = new Queue();

const bfs = () => {
  q.push(1);
  visited[1] = 1;

  while (!q.empty()) {
    const now = q.pop();

    for (let next of graph[now]) {
      if (visited[next]) continue;

      q.push(next);
      if (next > n) {
        visited[next] = visited[now];
      } else {
        visited[next] = visited[now] + 1;
      }
    }
  }
};

bfs();

if (visited[n]) console.log(visited[n]);
else console.log(-1);
