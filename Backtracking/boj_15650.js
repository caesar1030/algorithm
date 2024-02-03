const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);

const visited = new Array(n + 1).fill(false);

const selected = [];
const dfs = (depth) => {
  if (depth === m + 1) {
    console.log(selected.join(' '));
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i] || i < selected.at(-1)) continue;

    visited[i] = true;
    selected.push(i);
    dfs(depth + 1);
    visited[i] = false;
    selected.pop();
  }
};

dfs(1);
