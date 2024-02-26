const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = [];

for (let i = 0; i < n; i++) {
  arr.push(+input[line++]);
}

const plus = arr.filter((el) => el > 1);
const one = arr.filter((el) => el === 1);
const zero = arr.filter((el) => el === 0);
const minus = arr.filter((el) => el < 0);

let ans = 0;
ans += one.length;

plus.sort((a, b) => b - a);

for (let i = 0; i < plus.length; i++) {
  if (i === plus.length - 1) ans += plus[i];
  else {
    ans += plus[i] * plus[i + 1];
    ++i;
  }
}

minus.sort((a, b) => a - b);

for (let i = 0; i < minus.length; i++) {
  if (i === minus.length - 1) {
    if (zero.length === 0) ans += minus[i];
  } else {
    ans += minus[i] * minus[i + 1];
    ++i;
  }
}

console.log(ans);
