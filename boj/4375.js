const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');
let line = 0;

let num;
while ((num = input[line++])) {
  let temp = BigInt(1);
  let ans = 1;
  while (temp % BigInt(num)) {
    temp = temp * BigInt(10) + BigInt(1);
    ans++;
  }

  console.log(ans);
}
