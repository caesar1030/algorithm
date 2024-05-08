const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, k] = input[line++].split(' ').map(Number);
const s = input[line++].split(' ').map(Number);

let left = 0;
let right = 0;

let kCount = 0;
let sum = 0;
let temp = 0;

// while (right < n) {
//   if (left < right) {
//   } else if (left === right) {
//     if (s[0] % 2 === 0) {
//       temp += s[0];
//       sum = Math.max(temp, sum);
//     } else {
//       kCount++;
//     }

//     ++right;
//   } else {
//     // do nothing
//   }
// }

while (right < n) {
  if (kCount <= k) {
    if (s[right] % 2 === 0) {
      ++temp;
      sum = Math.max(temp, sum);
    } else {
      ++kCount;
    }
    ++right;
  } else {
    if (s[left] % 2 === 0) {
      --temp;
    } else {
      --kCount;
    }
    ++left;
  }
}

console.log(sum);
