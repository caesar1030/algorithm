const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const m = +input[line++];
const dp = new Array(n + 1).fill(0);
const vip = new Array(n + 1).fill(false);

for (let i = 0; i < m; i++) {
  const temp = +input[line++];
  vip[temp] = true;
}

dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

const arr = [];

let temp = 0;
for (let i = 1; i <= n; i++) {
  if (vip[i]) {
    if (temp) arr.push(temp);

    temp = 0;
  } else temp++;
}

if (temp) arr.push(temp);

console.log(arr.reduce((acc, cur) => acc * dp[cur], 1));
