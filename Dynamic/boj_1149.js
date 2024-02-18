const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = new Array(n).fill(null);

for (let i = 0; i < n; i++) {
  arr[i] = input[line++].split(' ').map(Number);
}

const dp = [...new Array(n)].map(() => new Array(3).fill(Number(1e7)));
for (let i = 0; i < 3; i++) {
  dp[0][i] = arr[0][i];
}

for (let i = 1; i < n; i++) {
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      if (j === k) continue;
      dp[i][j] = Math.min(dp[i][j], dp[i - 1][k]);
    }
    dp[i][j] += arr[i][j];
  }
}

console.log(Math.min(...dp[n - 1]));
