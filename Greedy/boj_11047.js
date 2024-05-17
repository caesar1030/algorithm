const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, k] = input[line++].split(' ').map(Number);
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(+input[line++]);
}

arr.sort((a, b) => b - a);

let rest = k;
let ans = 0;
let idx = 0;
while (rest > 0) {
  ans += Math.floor(rest / arr[idx]);
  rest = rest % arr[idx];
  ++idx;
}

console.log(ans);
