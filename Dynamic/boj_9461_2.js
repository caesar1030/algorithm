const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  const n = +input[line++];
  const dp = new Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 1;
  dp[3] = 1;
  dp[4] = 2;
  dp[5] = 2;
  for (let i = 6; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 5];
  }

  console.log(dp[n]);
}
