const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let [a, b] = input[line].split(' ').map(Number);

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

const arr = new Array(b + 1).fill(0);

const q = new Queue();
q.push(a);
arr[a] = 1;

while (!q.isEmpty()) {
  const now = q.pop();
  const nexts = [now * 2, now * 10 + 1];

  nexts.forEach((next) => {
    if (next > b) return;
    if (arr[next]) return;

    q.push(next);
    arr[next] = arr[now] + 1;
  });
}

if (!arr[b]) console.log(-1);
else console.log(arr[b]);
