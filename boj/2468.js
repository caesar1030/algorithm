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

const n = +input[line++];

const map = [];
for (let i = 0; i < n; i++) {
  const r = input[line++].split(' ').map(Number);
  map.push(r);
}
const max = Math.max(...map.flat());

const temp = (height) => {
  let ans = 0;
  const visited = [...new Array(n)].map(() => [...new Array(n)].fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] <= height) continue;
      if (visited[i][j]) continue;

      const queue = new Q();
      queue.push([i, j]);
      visited[i][j] = true;

      while (!queue.isEmpty()) {
        const [nowY, nowX] = queue.pop();

        for (let k = 0; k < 4; k++) {
          const nextY = nowY + dy[k];
          const nextX = nowX + dx[k];

          if (nextY >= n || nextX >= n || nextY < 0 || nextX < 0) continue;
          if (map[nextY][nextX] <= height) continue;
          if (visited[nextY][nextX]) continue;

          queue.push([nextY, nextX]);
          visited[nextY][nextX] = true;
        }
      }

      ++ans;
    }
  }

  return ans;
};

let ans = 0;
for (let height = 0; height < max; height++) {
  const result = temp(height);
  ans = Math.max(result, ans);
}

console.log(ans);
