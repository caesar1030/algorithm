const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const graph = new Array(n);
const visited = Array.from(new Array(n), () => new Array(n).fill(false));

for (let i = 0; i < n; i++) {
  graph[i] = input[i + 1];
}

const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

const dfs = (r, c) => {
  let rv = 1;
  visited[r][c] = true;

  for (let i = 0; i < 4; i++) {
    const nr = r + dy[i];
    const nc = c + dx[i];
    if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
    if (visited[nr][nc]) continue;
    if (graph[nr][nc] !== '1') continue;

    rv += dfs(nr, nc);
  }

  return rv;
};

const ans = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j]) continue;
    if (graph[i][j] !== '1') continue;
    ans.push(dfs(i, j));
  }
}

console.log(ans.length);
ans.sort((a, b) => a - b).forEach((val) => console.log(val));
