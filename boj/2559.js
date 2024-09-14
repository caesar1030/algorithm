const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, k] = input[line++].split(' ').map(Number);
const numbers = input[line++].split(' ').map(Number);

let sum = 0;
let ans = 0;
for (let i = 0; i < k; i++) {
  sum += numbers[i];
}

ans = sum;

for (let i = k; i < n; i++) {
  sum -= numbers[i - k];
  sum += numbers[i];

  ans = Math.max(sum, ans);
}

console.log(ans);
