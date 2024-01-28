const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  let n = +input[line++];

  const fibo = [0, 1];
  for (let i = 2; ; i++) {
    fibo[i] = fibo[i - 1] + fibo[i - 2];
    if (fibo[i] > n) break;
  }

  const ans = [];
  for (let i = fibo.length - 1; i >= 0; i--) {
    if (fibo[i] > n) continue;
    n -= fibo[i];
    ans.push(fibo[i]);

    if (n === 0) break;
  }

  console.log(ans.reduceRight((acc, cur) => acc + cur + ' ', ''));
}
