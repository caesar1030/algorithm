const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line];

let temp = 0;
let sum = 0;

while (n >= sum) {
  ++temp;
  sum += temp;
}

console.log(temp - 1);
