const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const dp = new Array(n + 1).fill(0);
for (let i = n - 1; i >= 1; i--) {
  let temp = dp[i + 1];
  if (i * 3 <= n) {
    temp = Math.min(temp, dp[i * 3]);
  }
  if (i * 2 <= n) {
    temp = Math.min(temp, dp[i * 2]);
  }

  dp[i] = temp + 1;
}

console.log(dp[1]);
