const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;
const n = +input[line++];
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(input[line++].split(' ').map(Number));
}

const selected = [];
let ans = 1200000000;
const dfs = (depth, start) => {
  if (depth >= 2) {
    let sin = 1;
    let ssen = 0;
    for (let i = 0; i < selected.length; i++) {
      sin *= arr[selected[i]][0];
      ssen += arr[selected[i]][1];
    }

    ans = Math.min(Math.abs(sin - ssen), ans);
  }

  for (let i = start; i < n; i++) {
    selected.push(i);
    dfs(depth + 1, i + 1);
    selected.pop();
  }
};

dfs(1, 0);
console.log(ans);
