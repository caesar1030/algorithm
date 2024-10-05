const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

let temp = 0;
let num = 665;

while (true) {
  if (/666/.test(num + '')) {
    temp++;
  }

  if (n === temp) {
    console.log(num);
    process.exit();
  }

  num++;
}
