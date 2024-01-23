const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = input[line];

const arr = n.split('-');

let ans = 0;
arr.forEach((el, i) => {
  const temp = el.split('+').map(Number);
  const sum = temp.reduce((acc, cur) => acc + cur, 0);

  if (i === 0) return (ans += sum);
  ans -= sum;
});

console.log(ans);
