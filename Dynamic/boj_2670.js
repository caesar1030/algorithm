const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(+input[line++]);
}

const dp = new Array(n).fill(0);
dp[0] = arr[0];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i - 1] * arr[i], arr[i]);
}

let ans = Math.max(...dp);
console.log(ans.toFixed(3));
