const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
arr.sort((a, b) => a - b);
const m = +input[line++];
const match = input[line++].split(' ').map(Number);

const lb = (target) => {
  let l = 0;
  let r = n;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (arr[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return r;
};

const rb = (target) => {
  let l = 0;
  let r = n;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (arr[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return r;
};

const ans = match.reduce((acc, cur) => {
  return acc + (rb(cur) - lb(cur)) + ' ';
}, '');

console.log(ans);
