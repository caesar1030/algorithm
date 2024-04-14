const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);

const money = +input[line++];

const check = (mid) => {
  const temp = arr
    .map((el) => (el <= mid ? el : mid))
    .reduce((acc, cur) => acc + cur, 0);

  return temp <= money;
};

let ans = null;
const solution = () => {
  let l = 1;
  let r = Math.max(...arr);

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (check(mid)) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
};

solution();
console.log(ans);
