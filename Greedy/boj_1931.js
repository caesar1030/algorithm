const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];
for (let i = 0; i < n; i++) {
  const [start, end] = input[line++].split(' ').map(Number);
  arr.push([start, end]);
}

arr.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }
  return a[1] - b[1];
});

let ans = 0;
let temp = 0;
arr.forEach((el) => {
  if (temp <= el[0]) {
    ++ans;
    temp = el[1];
  }
});

console.log(ans);
