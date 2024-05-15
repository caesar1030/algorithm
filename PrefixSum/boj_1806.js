const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, s] = input[line++].split(' ').map(Number);
const arr = input[line++].split(' ').map(Number);

const psum = [0];
for (let i = 0; i < n; i++) {
  psum.push(psum[i] + arr[i]);
}

let left = 0;
let right = 1;
let ans = 1e8 + 1;

while (right <= n && left <= right) {
  if (psum[right] - psum[left] >= s) {
    ans = Math.min(ans, right - left);
    left++;
  } else if (psum[right] - psum[left] < s) {
    right++;
  }
}

if (ans === 1e8 + 1) console.log(0);
else console.log(ans);
