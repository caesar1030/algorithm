// 13:45 시작
// 13:57 성공
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let t = +input[0];

const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

let line = 1;
while (t--) {
  // m이 컬럼 n이 로우
  const [m, n, k] = input[line].split(' ').map(Number);

  const graph = Array.from(Array(n), () => new Array(m).fill(0));

  for (let i = 1; i <= k; i++) {
    const [c, r] = input[line + i].split(' ').map(Number);
    graph[r][c] = 1;
  }

  const dfs = (y, x) => {
    graph[y][x] = 2;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
      if (graph[ny][nx] === 0 || graph[ny][nx] === 2) continue;
      dfs(ny, nx);
    }
  };

  let ans = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === 1) {
        dfs(i, j);
        ans++;
      }
    }
  }

  console.log(ans);
  line += k + 1;
}
