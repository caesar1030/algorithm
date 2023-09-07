const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const graph = new Array(n);
const temp = Array.from(new Array(n), () => new Array(m));
const visited = Array.from(new Array(n), () => new Array(m).fill(false));
const possible = [];
const selected = [];
const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];
let ans = 0;

for (let i = 0; i < n; i++) {
  graph[i] = input[i + 1].split(' ').map(Number);
  for (let j = 0; j < m; j++) {
    if (graph[i][j] === 0) possible.push([i, j]);
  }
}

const dfs = (y, x) => {
  temp[y][x] = 2;
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
    if (temp[ny][nx] === 1 || temp[ny][nx] === 2) continue;
    if (visited[ny][nx]) continue;
    dfs(ny, nx);
  }
};

const combi = (start) => {
  if (selected.length === 3) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        temp[i][j] = graph[i][j];
        visited[i][j] = false;
      }
    }

    selected.forEach((selectedIdx) => {
      const [y, x] = possible[selectedIdx];

      temp[y][x] = 1;
    });

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (temp[i][j] === 2) {
          dfs(i, j);
        }
      }
    }

    let tempSum = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (temp[i][j] === 0) {
          ++tempSum;
        }
      }
    }

    ans = Math.max(ans, tempSum);

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
