const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ');

const visited = new Array(10).fill(false);
const selected = [];
let minAns = 10000000000;
let maxAns = 0;

const dfs = (depth) => {
  if (depth === n + 2) {
    const sum = selected.reduce((acc, cur) => acc * 10 + cur, 0);
    minAns = Math.min(minAns, sum);
    maxAns = Math.max(maxAns, sum);
    return;
  }

  for (let i = 0; i < 10; i++) {
    if (depth === 1) {
      visited[i] = true;
      selected.push(i);
      dfs(depth + 1);
      selected.pop();
      visited[i] = false;
      continue;
    }

    if (arr[depth - 2] === '<' && selected.at(-1) >= i) continue;
    if (arr[depth - 2] === '>' && selected.at(-1) <= i) continue;
    if (visited[i]) continue;

    visited[i] = true;
    selected.push(i);
    dfs(depth + 1);
    selected.pop();
    visited[i] = false;
  }
};

dfs(1);
console.log(maxAns.toString().padStart(n + 1, '0'));
console.log(minAns.toString().padStart(n + 1, '0'));
