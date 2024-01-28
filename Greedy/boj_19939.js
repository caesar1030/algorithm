const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let [n, k] = input[line++].split(' ').map(Number);

const temp = (k * (k + 1)) / 2;

if (temp > n) {
  console.log(-1);
} else {
  n -= temp;

  if (n % k === 0) console.log(k - 1);
  else console.log(k);
}
