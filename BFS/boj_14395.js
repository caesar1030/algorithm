const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

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

const [s, t] = input[0].split(' ').map(Number);

if (s === t) {
  console.log(0);
  return;
}

const visited = new Set();
const q = new Queue();

let found = false;
let ans = '';
const bfs = (start) => {
  q.push([start, '']);
  visited.add(start);

  while (!q.empty()) {
    const [now, sum] = q.pop();

    if (now === t) {
      found = true;
      ans = sum;
      break;
    }
    const ops = now === 0 ? ['*', '+', '-'] : ['*', '+', '-', '/'];

    for (let op of ops) {
      let next;
      if (op === '*') next = now * now;
      if (op === '+') next = now + now;
      if (op === '-') next = now - now;
      if (op === '/') next = now / now;

      if (visited.has(next)) continue;
      q.push([next, sum + op]);
      visited.add(next);
    }
  }
};

bfs(s);

if (!found) console.log(-1);
else console.log(ans);
