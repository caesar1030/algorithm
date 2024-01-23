const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[++line];
const arr = input[line].split(' ').map(Number);

arr.sort((a, b) => a - b);

let ans = 0;
arr.reduce((acc, cur) => {
  const temp = acc + cur;
  ans += temp;
  return temp;
}, 0);

console.log(ans);
