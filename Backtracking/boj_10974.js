const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const visited = new Array(n + 1).fill(false);

const dfs = (depth, arr) => {
  if (arr.length === n) {
    console.log(arr.join(' '));
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    dfs(depth + 1, [...arr, i]);
    visited[i] = false;
  }
};

dfs(1, []);
