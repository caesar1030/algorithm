const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = new Array(n);
for (let i = 0; i < n; i++) {
  arr[i] = input[line++].split(' ').map(Number);
}

const visited = new Array(n).fill(false);
let ans = 987654321;

const dfs = (depth, sum, before, initial) => {
  if (depth === n + 1) {
    if (arr[before][initial] === 0) return;

    const temp = sum + arr[before][initial];
    ans = Math.min(ans, temp);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    if (arr[before][i] === 0) continue;

    visited[i] = true;
    dfs(depth + 1, sum + arr[before][i], i, initial);
    visited[i] = false;
  }
};

for (let i = 0; i < n; i++) {
  visited[i] = true;
  dfs(2, 0, i, i);
  visited[i] = false;
}

console.log(ans);
