const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m, h] = input[line++].split(' ').map(Number);

const arr = [...new Array(n)].map(() => new Array(h + 1).fill(false));
const dp = [...new Array(n)].map(() => new Array(h + 1).fill(0));

for (let i = 0; i < n; i++) {
  input[line++]
    .split(' ')
    .map(Number)
    .forEach((height) => (arr[i][height] = true));
  arr[i][0] = 1;
}

arr[0].forEach((_, idx) => {
  if (arr[0][idx]) dp[0][idx] = 1;
});
for (let i = 1; i < n; i++) {
  for (let j = 0; j <= h; j++) {
    for (let k = 0; k <= h; k++) {
      if (!arr[i][j]) continue;
      if (j + k > h) continue;

      dp[i][j + k] += dp[i - 1][k];
      dp[i][j + k] %= 10007;
    }
  }
}

console.log(dp[n - 1][h]);
