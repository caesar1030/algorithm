const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let t = +input[0];
let line = 1;

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

while (t--) {
  const [v, e] = input[line++].split(' ').map(Number);
  const graph = Array.from(new Array(v + 1), () => new Array());
  const visited = new Array(v + 1).fill(false);
  const color = new Array(v + 1).fill(false);

  for (let i = 0; i < e; i++) {
    const [s, d] = input[line++].split(' ').map(Number);
    graph[s].push(d);
    graph[d].push(s);
  }

  const q = new Queue();
  let isBipartite = true;
  const bfs = (start) => {
    q.push(start);
    visited[start] = true;
    color[start] = true;

    while (!q.empty()) {
      const now = q.pop();

      for (let next of graph[now]) {
        if (!visited[next]) {
          q.push(next);
          visited[next] = true;
          color[next] = !color[now];
        }
        if (visited[next]) {
          if (color[next] === color[now]) isBipartite = false;
        }
      }
    }
  };

  for (let i = 1; i <= v; i++) {
    if (visited[i]) continue;
    bfs(i);
  }

  if (isBipartite) console.log('YES');
  else console.log('NO');
}
