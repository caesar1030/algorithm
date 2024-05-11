const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);

let l = 0;
let r = 0;
let sum = arr[0];
let ans = 0;

while (sum < m) {
  ++r;
  sum += arr[r];
}

while (r < n) {
  if (sum === m) {
    ++ans;
    ++r;
    sum += arr[r];
  } else if (sum < m) {
    ++r;
    sum += arr[r];
  } else if (sum > m) {
    sum -= arr[l];
    ++l;
  }
}

console.log(ans);
