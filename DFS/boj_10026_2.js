const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const graph = Array.from(new Array(n), () => new Array(n));
const visited = Array.from(new Array(n), () => new Array(n).fill(false));

for (let i = 0; i < n; i++) {
  graph[i] = input[i + 1].split('');
}

const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

const dfs = (y, x) => {
  visited[y][x] = true;
  const char = graph[y][x];

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
    if (visited[ny][nx]) continue;
    if (graph[ny][nx] !== char) continue;
    dfs(ny, nx);
  }
};

let ans1 = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j]) continue;
    dfs(i, j);
    ++ans1;
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    visited[i][j] = false;
    if (graph[i][j] === 'G') graph[i][j] = 'R';
  }
}

let ans2 = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j]) continue;
    dfs(i, j);
    ++ans2;
  }
}

console.log(ans1, ans2);
