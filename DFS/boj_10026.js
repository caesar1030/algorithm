// 16:15시작
// 16:45 성공
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input.shift();
const graph = [];
for (let i = 0; i < n; i++) {
  graph.push(input[i]);
}

let ans = 0;
let ans_rg = 0;

const visited = Array.from(Array(n), () => new Array(n).fill(false));
const visited_rg = Array.from(Array(n), () => new Array(n).fill(false));

const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

const dfs = (y, x, char) => {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
    if (visited[ny][nx]) continue;
    if (graph[ny][nx] !== char) continue;

    dfs(ny, nx, char);
  }
};

const dfs_rg = (y, x, char) => {
  visited_rg[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
    if (visited_rg[ny][nx]) continue;
    const flag = char === 'B' ? graph[ny][nx] !== 'B' : graph[ny][nx] === 'B';

    if (flag) continue;

    dfs_rg(ny, nx, char);
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      dfs(i, j, graph[i][j]);
      ++ans;
    }

    if (!visited_rg[i][j]) {
      dfs_rg(i, j, graph[i][j]);
      ++ans_rg;
    }
  }
}

console.log(`${ans} ${ans_rg}`);
