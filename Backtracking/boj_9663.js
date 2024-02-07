const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line];
const p = [];

const isPossible = (x, y) => {
  for (let i = 0; i < p.length; i++) {
    if (p[i] === x) return false;
    if (Math.abs(p[i] - x) === Math.abs(i - y)) return false;
  }
  return true;
};

let ans = 0;
const dfs = (depth) => {
  if (depth === n + 1) {
    ++ans;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (!isPossible(i, depth - 1)) continue;

    p.push(i);
    dfs(depth + 1);
    p.pop();
  }
};

dfs(1);
console.log(ans);
