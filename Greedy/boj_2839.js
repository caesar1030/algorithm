const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let n = +input[line++];
let ans = 0;

while (n !== 0) {
  if (n < 3) {
    ans = -1;
    break;
  }

  if (n % 5 === 0) {
    ans += n / 5;
    n = 0;
  } else {
    ans += 1;
    n -= 3;
  }
}

console.log(ans);
