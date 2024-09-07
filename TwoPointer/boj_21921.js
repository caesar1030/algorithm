const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, x] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);

let max = 0;
let count = 0;

let left = 0;
let right = left + x - 1;
let temp = 0;

for (let i = 0; i <= right; i++) {
  temp += arr[i];
}

while (right < n) {
  if (temp > max) {
    max = temp;
    count = 1;
  } else if (temp === max) {
    ++count;
  } else {
    // do nothing
  }

  temp -= arr[left];
  ++left;
  ++right;
  temp += arr[right];
}

if (max === 0) {
  console.log('SAD');
} else {
  console.log(max);
  console.log(count);
}
