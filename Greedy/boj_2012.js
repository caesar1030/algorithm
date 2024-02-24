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

const ans = arr.reduce((acc, cur, idx) => {
  return acc + Math.abs(cur - (idx + 1));
}, 0);

console.log(ans);
