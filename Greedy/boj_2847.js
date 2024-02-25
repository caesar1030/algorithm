const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(+input[line++]);
}

let temp = arr.at(-1);
let ans = 0;
for (let i = n - 2; i >= 0; i--) {
  if (arr[i] >= temp) {
    ans += arr[i] - (temp - 1);
    temp = temp - 1;
  } else {
    temp = arr[i];
  }
}

console.log(ans);
