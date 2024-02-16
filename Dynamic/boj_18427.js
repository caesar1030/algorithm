const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m, h] = input[line++].split(' ').map(Number);
const arr = [...new Array(n + 1)].map(() => new Array(h + 1).fill(false));
const dp = [...new Array(n + 1)].map(() => new Array(h + 1).fill(0));

for (let i = 1; i <= n; i++) {
  input[line++]
    .split(' ')
    .map(Number)
    .forEach((height) => (arr[i][height] = true));
  arr[i][0] = true;
}

dp[0][0] = 1;
for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= h; j++) {
    for (let k = 0; k <= h; k++) {
      if (!arr[i][k]) continue;
      if (!dp[i - 1][j]) continue;
      const height = k + j;
      if (height <= h) dp[i][height] = (dp[i][height] + dp[i - 1][j]) % 10007;
    }
  }
}

console.log(dp[n][h]);
