const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
const sum = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
  sum[i] = arr[i - 1] + sum[i - 1];
}

const m = +input[line++];
let ans = '';

for (let i = 0; i < m; i++) {
  const [a, b] = input[line++].split(' ').map(Number);
  ans += `${sum[b] - sum[a - 1]}\n`;
}

console.log(ans);
