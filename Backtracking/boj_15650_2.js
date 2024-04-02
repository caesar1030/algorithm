const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = [...new Array(n)].map((_, idx) => idx + 1);

const selected = [];
const dfs = (depth, idx) => {
  if (selected.length === m) {
    console.log(selected.join(' '));
    return;
  }

  for (let i = idx; i < n; i++) {
    selected.push(arr[i]);
    dfs(depth + 1, i + 1);
    selected.pop();
  }
};

dfs(0, 0);
