const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const str = input[line];

let temp = str[0];
let num0 = 0;
let num1 = 0;

for (let i = 1; i < str.length; i++) {
  if (str[i] !== temp) {
    if (temp === '0') num0++;
    else num1++;

    temp = str[i];
  }
}

if (str.at(-1) === '0') num0++;
else num1++;

console.log(Math.min(num0, num1));
