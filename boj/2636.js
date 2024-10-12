const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = [];

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

for (let i = 0; i < n; i++) {
  const row = input[line++].split(' ').map(Number);
  arr.push(row);
}

let timeAns = 0;
let numAns = 0;
while (true) {
  const pos = [];
  const visited = [...new Array(n)].map(() => new Array(m).fill(false));

  const dfs = (y, x) => {
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny >= n || ny < 0 || nx >= m || nx < 0) continue;
      if (visited[ny][nx]) continue;
      if (arr[ny][nx] === 1) {
        pos.push([ny, nx]);
        visited[ny][nx] = true;
        continue;
      }

      visited[ny][nx] = true;
      dfs(ny, nx);
    }
  };

  visited[0][0] = true;
  dfs(0, 0);
  if (pos.length === 0) break;
  pos.forEach(([y, x]) => {
    arr[y][x] = 0;
  });

  timeAns++;
  numAns = pos.length;
}

console.log(timeAns);
console.log(numAns);
