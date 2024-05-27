const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

const arr = input[line++].split(' ').map(Number);
const arrow = new Array(1e6 + 2).fill(0);

let ans = 0;

arr.forEach((val) => {
  if (arrow[val + 1] === 0) {
    ++ans;
    arrow[val] += 1;
    return;
  }

  arrow[val + 1] -= 1;
  arrow[val] += 1;
});

console.log(ans);
