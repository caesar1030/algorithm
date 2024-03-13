const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = new Array(n).fill(null);
const dp = [...new Array(n)].map(() => new Array(n).fill(0));

for (let i = 0; i < n; i++) {
  arr[i] = input[line++].split(' ').map(Number);
}

dp[0][0] = arr[0][0];
for (let i = 1; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === 0) dp[i][j] = dp[i - 1][j] + arr[i][j];
    else if (j === i) dp[i][j] = dp[i - 1][j - 1] + arr[i][j];
    else dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + arr[i][j];
  }
}

console.log(Math.max(...dp[n - 1]));
