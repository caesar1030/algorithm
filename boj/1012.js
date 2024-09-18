const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;
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

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let t = +input[line++];

while (t--) {
  const [m, n, k] = input[line++].split(' ').map(Number);

  const map = [...new Array(n)].map(() => [...new Array(m)].map(() => 0));
  const visited = [...new Array(n)].map(() => [...new Array(m)].map(() => 0));

  for (let i = 0; i < k; i++) {
    const [x, y] = input[line++].split(' ').map(Number);
    map[y][x] = 1;
  }

  const queue = new Q();
  const bfs = (y, x) => {
    queue.push([y, x]);
    visited[y][x] = 1;

    while (!queue.isEmpty()) {
      const [nowY, nowX] = queue.pop();
      for (let i = 0; i < 4; i++) {
        const nextY = nowY + dy[i];
        const nextX = nowX + dx[i];

        if (nextY >= n || nextX >= m || nextY < 0 || nextX < 0) continue;
        if (!map[nextY][nextX]) continue;
        if (visited[nextY][nextX]) continue;

        queue.push([nextY, nextX]);
        visited[nextY][nextX] = 1;
      }
    }
  };
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] && !visited[i][j]) {
        ++ans;
        bfs(i, j);
      }
    }
  }

  console.log(ans);
}
