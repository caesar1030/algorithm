const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);
const sum = new Array(n + 1).fill(0);
const temp = new Array(m).fill(0);

let ans = 0;

for (let i = 1; i <= n; i++) {
  sum[i] = arr[i - 1] + sum[i - 1];
  temp[sum[i] % m]++;
}

for (let i = 0; i < m; i++) {
  ans += (temp[i] * (temp[i] - 1)) / 2;
}

console.log(ans);
