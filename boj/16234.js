const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
let line = 0;

const [n, l, r] = input[line++].split(" ").map(Number);
const arr = [];

for (let i = 0; i < n; i++) {
  arr.push(input[line++].split(" ").map(Number));
}

let day = 0;

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

while (true) {
  const visited = [...new Array(n)].map(() => new Array(n).fill(false));

  const dfs = (y, x) => {
    visited[y][x] = true;
    const rv = [];
    for (let i = 0; i < 4; i++) {
      const nextY = y + dy[i];
      const nextX = x + dx[i];

      if (nextY >= n || nextY < 0 || nextX >= n || nextX < 0) continue;
      if (visited[nextY][nextX]) continue;
      const gap = Math.abs(arr[nextY][nextX] - arr[y][x]);
      if (gap < l || gap > r) continue;

      rv.push(...dfs(nextY, nextX));
    }

    rv.push([y, x]);

    return rv;
  };

  let flag = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j]) continue;

      flag++;
      const rvs = dfs(i, j);

      const avg = Math.floor(
        rvs.reduce((acc, cur) => {
          return acc + arr[cur[0]][cur[1]];
        }, 0) / rvs.length
      );

      rvs.forEach((pos) => {
        const [y, x] = pos;
        arr[y][x] = avg;
      });
    }
  }

  if (flag === n ** 2) break;
  ++day;
}

console.log(day);
