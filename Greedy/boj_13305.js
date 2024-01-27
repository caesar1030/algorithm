const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const distance = input[line++].split(' ').map(Number);
const pay = input[line++].split(' ').map(Number);

let now = 0;
let nowPay = pay[0];
let ans = BigInt(0);

while (true) {
  if (now === n - 1) break;

  if (nowPay > pay[now + 1]) {
    ans += BigInt(distance[now]) * BigInt(nowPay);
    nowPay = pay[now + 1];
  } else {
    ans += BigInt(distance[now]) * BigInt(nowPay);
  }

  ++now;
}

console.log(String(ans));
