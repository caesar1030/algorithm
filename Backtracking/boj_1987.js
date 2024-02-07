const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [r, c] = input[line++].split(' ').map(Number);
const arr = new Array(r);

for (let i = 0; i < r; i++) {
  arr[i] = input[line++];
}

const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

let ans = 0;
const used = new Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0)).fill(false);
const visited = [...new Array(r)].map(() => new Array(c).fill(false));

const dfs = (now, dist) => {
  ans = Math.max(ans, dist);

  for (let i = 0; i < 4; i++) {
    const ny = now.y + dy[i];
    const nx = now.x + dx[i];
    if (ny < 0 || ny >= r || nx < 0 || nx >= c) continue;
    if (visited[ny][nx]) continue;
    if (used[arr[ny][nx].charCodeAt(0)]) continue;

    used[arr[ny][nx].charCodeAt(0)] = true;
    visited[ny][nx] = true;
    dfs({ y: ny, x: nx }, dist + 1);
    visited[ny][nx] = false;
    used[arr[ny][nx].charCodeAt(0)] = false;
  }
};

visited[0][0] = true;
used[arr[0][0].charCodeAt(0)] = true;
dfs({ y: 0, x: 0 }, 1);

console.log(ans);
