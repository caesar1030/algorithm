const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const map = [];

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

for (let i = 0; i < n; i++) {
  const str = input[line++];
  map.push(str);
}

const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

const visited = [...new Array(n)].map(() => [...new Array(m)].map(() => 0));
const queue = new Q();

queue.push([0, 0]);
visited[0][0] = 1;

while (!queue.isEmpty()) {
  const [nowY, nowX] = queue.pop();

  for (let i = 0; i < 4; i++) {
    const nextY = nowY + dy[i];
    const nextX = nowX + dx[i];

    if (nextY >= n || nextX >= m || nextY < 0 || nextX < 0) continue;
    if (map[nextY][nextX] !== '1') continue;
    if (visited[nextY][nextX]) continue;

    queue.push([nextY, nextX]);
    visited[nextY][nextX] = visited[nowY][nowX] + 1;
  }
}

console.log(visited[n - 1][m - 1]);
