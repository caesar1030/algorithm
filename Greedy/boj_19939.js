const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, k] = input[line++].split(' ').map(Number);

if (n < (k * (k + 1)) / 2) {
  console.log(-1);
} else {
  let ans = k - 1;
  const rest = n - (k * (k + 1)) / 2;
  if (rest % k) ans++;

  console.log(ans);
}
