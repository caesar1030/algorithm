const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

class Q {
  constructor() {
    this.header = 0;
    this.tail = 0;
    this.items = {};
  }

  push(item) {
    this.items[this.tail++] = item;
  }

  pop() {
    const rv = this.items[this.header];
    delete this.items[this.header++];

    return rv;
  }

  isEmpty() {
    return this.header === this.tail;
  }
}

const visited = new Array(2e5 + 1).fill(0);
const [n, k] = input[0].split(' ').map(Number);

const q = new Q();
q.push(n);
visited[n] = 1;

while (!q.isEmpty()) {
  const now = q.pop();
  if (now === k) break;

  const funcs = [(num) => num * 2, (num) => num + 1, (num) => num - 1];

  for (let i = 0; i < 3; i++) {
    const next = funcs[i](now);

    if (next >= 2e5 || next < 0) continue;
    if (visited[next]) continue;

    visited[next] = visited[now] + 1;
    q.push(next);
  }
}

console.log(visited[k] - 1);
