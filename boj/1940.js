const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const m = +input[line++];
const nums = input[line++]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

let left = 0;
let right = n - 1;

let ans = 0;
while (left < right) {
  const sum = nums[left] + nums[right];
  if (sum === m) {
    ans++;
    left++;
  } else if (sum < m) {
    left++;
  } else {
    right--;
  }
}

console.log(ans);
