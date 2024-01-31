const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
const money = +input[line++];

let left = 1;
let right = Math.max(...arr);

let ans = 0;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  const sum = arr.reduce((acc, cur) => acc + Math.min(cur, mid), 0);

  if (sum > money) {
    right = mid - 1;
  } else {
    ans = mid;
    left = mid + 1;
  }
}

console.log(ans);
