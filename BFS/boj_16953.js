const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [a, b] = input[0].split(' ').map(Number);

const visited = new Map();

class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  push(item) {
    this.items[this.head++] = item;
  }

  pop() {
    const item = this.items[this.tail];
    delete this.items[this.tail++];

    return item;
  }

  empty() {
    return this.tail === this.head;
  }
}

const q = new Queue();

const bfs = () => {
  q.push(a);
  visited.set(a, 1);

  while (!q.empty()) {
    const now = q.pop();

    for (const next of [now * 2, now * 10 + 1]) {
      if (next > 1e9) continue;
      if (visited.get(next)) continue;
      q.push(next);
      visited.set(next, visited.get(now) + 1);
    }
  }
};

bfs();

console.log(visited.get(b) ? visited.get(b) : -1);
