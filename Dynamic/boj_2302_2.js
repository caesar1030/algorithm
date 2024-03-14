const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const m = +input[line++];

const dp = new Array(n + 1).fill(0);
dp[0] = 1;
dp[1] = 1;
dp[2] = 2;
for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

const vip = [];
vip.sort((a, b) => a - b);

for (let i = 0; i < m; i++) {
  vip.push(+input[line++]);
}

let temp = 0;
let ans = 1;
for (let i = 1; i <= n; i++) {
  if (i === vip[0]) {
    vip.shift();
    ans *= dp[temp];
    temp = 0;
  } else {
    temp++;
  }
}

ans *= dp[temp];

console.log(ans);
