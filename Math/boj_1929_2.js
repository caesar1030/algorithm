const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [m, n] = input[line++].split(' ').map(Number);

const isPrime = new Array(n + 1).fill(true);

for (let i = 2; i <= Math.sqrt(n); i++) {
  if (!isPrime[i]) continue;
  for (let j = i * i; j <= n; j += i) isPrime[j] = false;
}

let ans = '';
for (let i = m; i <= n; i++) {
  if (i === 1) continue;
  if (!isPrime[i]) continue;
  ans += i + '\n';
}
console.log(ans);
