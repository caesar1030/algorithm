const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [k, n] = input[line++].split(' ').map(Number);

const arr = [];
for (let i = 0; i < k; i++) {
  arr.push(+input[line++]);
}

let l = 1;
let r = Math.max(...arr);
let ans = null;

const check = (mid) => {
  const rv = arr.reduce((acc, cur) => {
    return acc + Math.floor(cur / mid);
  }, 0);

  return rv >= n;
};

while (l <= r) {
  const mid = Math.floor((l + r) / 2);

  // console.log(mid, check(mid));
  if (check(mid)) {
    ans = mid;
    l = mid + 1;
  } else {
    r = mid - 1;
  }
}

console.log(ans);
