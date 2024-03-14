const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];
const dp = new Array(n).fill(0);

for (let i = 0; i < n; i++) {
  arr.push(+input[line++]);
}

dp[0] = arr[0];

for (let i = 1; i < n; i++) {
  if (dp[i - 1] > 1) dp[i] = dp[i - 1] * arr[i];
  else dp[i] = arr[i];
}

console.log(Math.max(...dp).toFixed(3));
