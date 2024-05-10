const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
const x = +input[line++];

arr.sort((a, b) => a - b);

let left = 0;
let right = n - 1;
let ans = 0;

while (left < right) {
  const sum = arr[left] + arr[right];

  if (sum === x) {
    ++ans;
    ++left;
  } else if (sum < x) {
    ++left;
  } else {
    --right;
  }
}

console.log(ans);
