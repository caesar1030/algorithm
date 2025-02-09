const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const scvs = input[line++].split(' ').map(Number);

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
    const rv = this.items[this.tail];
    delete this.items[this.tail++];

    return rv;
  }

  isEmpty() {
    return this.tail === this.head;
  }
}

const dd = [
  [-9, -3, -1],
  [-9, -1, -3],
  [-3, -9, -1],
  [-3, -1, -9],
  [-1, -9, -3],
  [-1, -3, -9],
];

for (let i = n; i < 3; i++) {
  scvs[i] = 0;
}

const arr = [...new Array(61)].map(() =>
  [...new Array(61)].map(() => [...new Array(61).fill(0)]),
);

const q = new Queue();
arr[scvs[0]][scvs[1]][scvs[2]] = 1;
q.push([scvs[0], scvs[1], scvs[2]]);

while (!q.isEmpty()) {
  const [first, second, third] = q.pop();

  for (let i = 0; i < 6; i++) {
    const nf = Math.max(0, first + dd[i][0]);
    const ns = Math.max(0, second + dd[i][1]);
    const nt = Math.max(0, third + dd[i][2]);

    if (arr[nf][ns][nt]) continue;
    arr[nf][ns][nt] = arr[first][second][third] + 1;
    q.push([nf, ns, nt]);
  }
}

console.log(arr[0][0][0] - 1);
