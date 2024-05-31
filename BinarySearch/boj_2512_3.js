const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
const m = +input[line++];

let l = 0;
let r = Math.max(...arr);

const check = (mid) => {
  const sum = arr.reduce((acc, cur) => {
    if (mid < cur) return acc + mid;
    else return acc + cur;
  }, 0);

  return sum <= m;
};

let ans = null;

while (l <= r) {
  const mid = Math.floor((l + r) / 2);

  if (check(mid)) {
    ans = mid;
    l = mid + 1;
  } else {
    r = mid - 1;
  }
}

console.log(ans);
