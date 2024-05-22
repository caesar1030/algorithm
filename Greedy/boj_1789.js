const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line];
let sum = 0;
let ans = 0;
let now = 1;
while (sum + now <= n) {
  sum += now++;
  ++ans;
}

console.log(ans);
