const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);

let sum = 0;
const pSum = [0];

for (let x of arr) {
  sum += x;
  pSum.push(sum);
}

const m = +input[line++];
const ans = [];

for (let i = 0; i < m; i++) {
  const [left, right] = input[line++].split(' ').map(Number);
  ans.push(pSum[right] - pSum[left - 1]);
}

console.log(ans.join('\n'));
