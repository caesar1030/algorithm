const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m, k] = input[line++].split(' ').map(Number);

const arr = [...new Array(n)].map(() => [...new Array(m)].fill(1));

for (let i = 0; i < k; i++) {
  const [sx, sy, ex, ey] = input[line++].split(' ').map(Number);

  for (let j = sx; j < ex; j++) {
    for (let k = sy; k < ey; k++) {
      arr[k][j] = 0;
    }
  }
}

const visited = [...new Array(n)].map(() => [...new Array(m)].fill(false));

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const dfs = (y, x) => {
  visited[y][x] = true;
  let rv = 1;

  for (let i = 0; i < 4; i++) {
    const nextY = y + dy[i];
    const nextX = x + dx[i];

    if (nextY >= n || nextX >= m || nextY < 0 || nextX < 0) continue;
    if (!arr[nextY][nextX] || visited[nextY][nextX]) continue;

    rv += dfs(nextY, nextX);
  }

  return rv;
};

let ansNum = 0;
let nums = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visited[i][j] && arr[i][j]) {
      const rv = dfs(i, j);
      ++ansNum;
      nums.push(rv);
    }
  }
}

console.log(ansNum);
console.log(nums.sort((a, b) => a - b).join(' '));
