const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = [...new Array(n)].map((_, idx) => idx + 1);
const visited = new Array(n).fill(false);

const selected = [];
const dfs = (depth) => {
  if (selected.length === n) {
    console.log(selected.join(' '));
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    selected.push(arr[i]);
    visited[i] = true;
    dfs(depth + 1);
    visited[i] = false;
    selected.pop();
  }
};

dfs(0);
