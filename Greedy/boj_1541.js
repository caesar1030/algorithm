const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = input[line];

const arr = n.split('-');

const ans = arr.reduce((acc, cur, idx) => {
  const temp = cur
    .split('+')
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);
  if (idx === 0) return temp;
  return acc - temp;
}, 0);

console.log(ans);
