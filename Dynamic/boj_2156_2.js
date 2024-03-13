const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const dp = new Array(n + 1).fill(0);

const arr = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  const temp = +input[line++];
  arr[i] = temp;
}

dp[0] = 0;
dp[1] = arr[1];
dp[2] = arr[1] + arr[2];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(
    dp[i - 3] + arr[i] + arr[i - 1],
    dp[i - 2] + arr[i],
    dp[i - 1]
  );
}

console.log(dp[n]);
