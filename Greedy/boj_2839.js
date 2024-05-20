const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line];

class Q {
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

const arr = new Array(5003).fill(0);

const bfs = () => {
  const queue = new Q();

  queue.push(3);
  arr[3] = 1;
  queue.push(5);
  arr[5] = 1;

  while (!queue.isEmpty()) {
    const now = queue.pop();

    const distance = [3, 5];
    for (let d of distance) {
      if (arr[now + d]) continue;
      if (now + d > n) continue;
      queue.push(now + d);
      arr[now + d] = arr[now] + 1;
    }
  }
};

bfs();

if (!arr[n]) console.log(-1);
else console.log(arr[n]);
