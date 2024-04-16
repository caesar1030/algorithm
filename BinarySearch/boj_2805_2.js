const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);

const check = (mid) => {
  const temp = arr.reduce((acc, cur) => acc + (cur > mid ? cur - mid : 0), 0);
  return temp >= m;
};

let ans = null;
const solution = () => {
  let l = 0;
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
