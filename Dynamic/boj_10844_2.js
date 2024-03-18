const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const dp = [...new Array(n + 1)].map(() => new Array(10).fill(0));

for (let i = 1; i <= 9; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= n; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j >= 1) dp[i][j] += dp[i - 1][j - 1];
    if (j <= 8) dp[i][j] += dp[i - 1][j + 1];

    dp[i][j] %= 1e9;
  }
}

console.log(dp[n].reduce((acc, cur) => acc + cur) % 1e9);
