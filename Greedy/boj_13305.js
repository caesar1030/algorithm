const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const distance = input[line++].split(' ').map(Number);
const pay = input[line++].split(' ').map(Number);

let nowPay = pay[0];
let now = 0;
let ans = BigInt(0);

while (now < n - 1) {
  ans += BigInt(nowPay) * BigInt(distance[now]);
  if (pay[now + 1] < nowPay) nowPay = pay[now + 1];
  now += 1;
}

console.log(String(ans));
