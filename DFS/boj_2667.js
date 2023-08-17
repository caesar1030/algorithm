const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const graph = [];
for (let i = 1; i <= n; i++) {
  graph.push(input[i]);
}
const visited = Array.from(Array(n), () => Array(n).fill(false));

const dy = [0, -1, 0, 1];
const dx = [-1, 0, 1, 0];

const dfs = (row, col, cn) => {
  visited[row][col] = true;
  ans[cn]++;

  for (let i = 0; i < 4; i++) {
    const ny = row + dy[i];
    const nx = col + dx[i];

    if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
    if (visited[ny][nx]) continue;
    if (graph[ny][nx] !== '1') continue;

    dfs(ny, nx, cn);
  }
};

const ans = Array(n * n).fill(0);
let cn = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j] && graph[i][j] === '1') {
      dfs(i, j, cn);
      ++cn;
    }
  }
}

console.log(cn);
console.log(
  ans
    .slice(0, cn)
    .sort((a, b) => a - b)
    .reduce((acc, cur) => {
      return acc + '' + cur + '\n';
    }, '')
);
