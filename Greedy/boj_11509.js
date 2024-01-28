const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const height = input[line++].split(' ').map(Number);
const arrow = new Array(1000000 + 1).fill(0);

height.forEach((h) => {
  if (arrow[h] === 0) {
    arrow[h - 1] += 1;
    return;
  }

  arrow[h] -= 1;
  arrow[h - 1] += 1;
});

const ans = arrow.reduce((acc, cur) => acc + cur, 0);
console.log(ans);
