const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const juice = [];
for (let i = 0; i < n; i++) {
  juice.push(+input[line++]);
}

const dp = new Array(n).fill(0);

dp[0] = juice[0];
dp[1] = dp[0] + juice[1];
dp[2] = Math.max(juice[0] + juice[2], juice[1] + juice[2], juice[0] + juice[1]);

for (let i = 3; i < n; i++) {
  dp[i] = Math.max(
    dp[i - 1],
    dp[i - 2] + juice[i],
    dp[i - 3] + juice[i - 1] + juice[i]
  );
}

console.log(Math.max(...dp));
