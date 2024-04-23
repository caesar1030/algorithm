const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

while (t--) {
  // m x / n y
  const [m, n, k] = input[line++].split(' ').map(Number);
  const arr = [...new Array(n)].map(() => new Array(m).fill(0));
  const visited = [...new Array(n)].map(() => new Array(m).fill(false));

  for (let i = 0; i < k; i++) {
    const [x, y] = input[line++].split(' ').map(Number);

    arr[y][x] = 1;
  }

  const dfs = (now) => {
    const [nowR, nowC] = now;

    for (let i = 0; i < 4; i++) {
      const nextR = nowR + dy[i];
      const nextC = nowC + dx[i];

      if (nextR < 0 || nextR >= n || nextC < 0 || nextC >= m) continue;
      if (visited[nextR][nextC]) continue;
      if (arr[nextR][nextC] === 0) continue;

      visited[nextR][nextC] = true;
      dfs([nextR, nextC]);
    }
  };

  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (visited[i][j]) continue;
      if (arr[i][j] === 0) continue;

      ++ans;
      visited[i][j] = true;
      dfs([i, j]);
    }
  }
  console.log(ans);
}
