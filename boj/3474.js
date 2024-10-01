const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  const n = +input[line++];

  let num2 = 0;
  let num5 = 0;

  for (let i = 2; i <= n; i *= 2) {
    num2 += Math.floor(n / i);
  }

  for (let i = 5; i <= n; i *= 5) {
    num5 += Math.floor(n / i);
  }

  console.log(Math.min(num2, num5));
}
