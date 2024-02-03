const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);

const selected = [];
let ans = '';
const dfs = (depth) => {
  if (depth === m + 1) {
    ans += selected.join(' ') + '\n';
    return;
  }

  for (let i = 1; i <= n; i++) {
    selected.push(i);
    dfs(depth + 1);
    selected.pop();
  }
};

dfs(1);

console.log(ans);
