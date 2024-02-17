const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const dp = new Array(n + 1).fill(0);

dp[n] = 1;
for (let i = n - 1; i >= 1; i--) {
  dp[i] = dp[i + 1] + 1;

  if (i * 2 <= n && dp[i * 2]) {
    dp[i] = Math.min(dp[i], dp[i * 2] + 1);
  }

  if (i * 3 <= n && dp[i * 3]) {
    dp[i] = Math.min(dp[i], dp[i * 3] + 1);
  }
}

console.log(dp[1] - 1);
