const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let [a, b] = input[line].split(' ').map(Number);
let ans = 1;

while (a < b) {
  if (b % 2 === 0) {
    b /= 2;
    ++ans;
  } else if (b % 10 === 1) {
    b -= 1;
    b /= 10;
    ++ans;
  } else {
    break;
  }
}

if (a === b) console.log(ans);
else console.log(-1);
