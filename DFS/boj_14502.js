// 10:25시작
// 11:20 성공
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const graph = Array.from(Array(n), () => new Array(m));
const possible = [];
const virus = [];

for (let i = 0; i < n; i++) {
  input[i + 1]
    .split(' ')
    .map(Number)
    .forEach((number, j) => {
      if (number === 0) {
        possible.push([i, j]);
      }

      if (number === 2) {
        virus.push([i, j]);
      }

      graph[i][j] = number;
    });
}

//

const selected = [];
let ans = 0;
const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

const dfs = (r, c, graph, visited) => {
  graph[r][c] = 2;
  visited[r][c] = true;

  for (let i = 0; i < 4; i++) {
    const nr = r + dy[i];
    const nc = c + dx[i];

    if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
    if (graph[nr][nc] !== 0) continue;
    if (visited[nr][nc]) continue;

    dfs(nr, nc, graph, visited);
  }
};

const combi = (start) => {
  if (selected.length === 3) {
    const newGraph = Array.from(Array(n), () => new Array(m));
    const visited = Array.from(Array(n), () => new Array(m).fill(false));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        newGraph[i][j] = graph[i][j];
      }
    }

    selected.forEach((yx) => {
      const [y, x] = possible[yx];
      newGraph[y][x] = 1;
    });

    virus.forEach((value) => {
      const [row, col] = value;

      dfs(row, col, newGraph, visited);
    });

    let temp = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (newGraph[i][j] === 0) ++temp;
      }
    }
    ans = Math.max(temp, ans);

    return;
  }

  for (let i = start; i < possible.length; i++) {
    selected.push(i);
    combi(i + 1);
    selected.pop();
  }
};

combi(0);

console.log(ans);
