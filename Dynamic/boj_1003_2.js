const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];
while (t--) {
  const n = +input[line++];

  const dp = new Array(n + 1).fill(0);

  dp[0] = [1, 0];
  dp[1] = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = [dp[i - 1][0] + dp[i - 2][0], dp[i - 1][1] + dp[i - 2][1]];
  }

  console.log(dp[n][0], dp[n][1]);
}
