const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let t = +input.shift();
let line = 0;

while (t--) {
  const [m, n, k] = input[line].split(' ').map(Number);

  const graph = Array.from(Array(n), () => new Array(m).fill(0));
  const visited = Array.from(Array(n), () => new Array(m).fill(false));

  for (let i = 1; i <= k; i++) {
    const [col, row] = input[line + i].split(' ').map(Number);
    graph[row][col] = 1;
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const dfs = (y, x) => {
    visited[y][x] = true;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
      if (!graph[ny][nx]) continue;
      if (visited[ny][nx]) continue;

      dfs(ny, nx);
    }
  };

  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && graph[i][j]) {
        dfs(i, j);
        ++ans;
      }
    }
  }

  console.log(ans);
  line += k + 1;
}
