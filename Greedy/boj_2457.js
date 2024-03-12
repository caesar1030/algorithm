const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];
for (let i = 0; i < n; i++) {
  const [sm, sd, em, ed] = input[line++].split(' ').map(Number);
  arr.push([sm * 100 + sd, em * 100 + ed]);
}

arr.sort((a, b) => a[0] - b[0]);

let s = 311;
let e = 311;
let flag = true;
let ans = 0;
for (let el of arr) {
  if (el[0] <= s) {
    e = max(el[1], temp);
    continue;
  }

  if (el[1] < e) continue;

  s = e;

  if (el[0] > s) {
    flag = false;
    break;
  }

  e = max(el[1], temp);
  ++ans;
}
