const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(+input[line++]);
}

arr.sort((a, b) => a - b);

let ans = 0;
for (let i = 0; i < n; i++) {
  const m = arr[i] * (n - i);
  ans = Math.max(m, ans);
}

console.log(ans);
