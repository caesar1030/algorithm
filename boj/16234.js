const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [n, l, r] = input[line++].split(" ").map(Number);

const arr = [];

for (let i = 0; i < n; i++) {
  const row = input[line++].split(" ").map(Number);

  arr.push(row);
}

let day = 0;
const visited = [...new Array(n)].map(() => new Array(n).fill(false));

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

const dfs = (nowY, nowX) => {
  const rv = [[nowY, nowX]];
  for (let i = 0; i < 4; i++) {
    const nextY = nowY + dy[i];
    const nextX = nowX + dx[i];

    if (nextY >= n || nextY < 0 || nextX >= n || nextX < 0) continue;
    if (visited[nextY][nextX]) continue;
    const diff = Math.abs(arr[nowY][nowX] - arr[nextY][nextX]);
    if (diff < l || diff > r) continue;

    visited[nextY][nextX] = true;
    rv.push(...dfs(nextY, nextX));
  }

  return rv;
};

while (true) {
  visited.forEach((row) => row.fill(false));

  let comps = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;
      visited[i][j] = true;
      const rv = dfs(i, j);
      comps++;
      const sum = rv.reduce((acc, cur) => acc + arr[cur[0]][cur[1]], 0);
      rv.forEach(([y, x]) => (arr[y][x] = Math.floor(sum / rv.length)));
    }
  }

  if (comps === n * n) break;
  day++;
}

console.log(day);
