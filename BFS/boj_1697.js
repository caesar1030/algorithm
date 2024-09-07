// 17:49 시작

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, k] = input[0].split(' ').map(Number);

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
    const rv = this.items[this.head];
    delete this.items[this.head++];

    return rv;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

const visited = new Array(1e5 * 2 + 1).fill(0);

const q = new Queue();
q.push(n);
visited[n] = 1;

while (!q.isEmpty()) {
  const now = q.pop();

  const nexts = [now + 1, now - 1, now * 2];
  for (let next of nexts) {
    if (next > 1e5 * 2) continue;
    if (next < 0) continue;
    if (visited[next]) continue;

    // console.log(next, visited[next]);

    q.push(next);
    visited[next] = visited[now] + 1;
  }
}

console.log(visited[k] - 1);
