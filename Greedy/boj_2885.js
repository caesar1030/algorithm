const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const k = +input[line++];

let ans1 = 1;
while (ans1 < k) {
  ans1 *= 2;
}

let rest = k;
let chunk = ans1;
let ans2 = 0;

while (rest !== 0) {
  const num = Math.floor(rest / chunk);
  rest -= num * chunk;
  chunk = chunk / 2;
  ans2++;
}

console.log(ans1, ans2 - 1);
