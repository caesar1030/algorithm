const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  let n = +input[line++];
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(input[line++].split(' ').map(Number));
  }

  arr.sort((a, b) => a[0] - b[0]);

  let ans = 0;
  arr.reduce((acc, cur) => {
    if (cur[1] > acc) return acc;

    ++ans;
    return Math.min(acc, cur[1]);
  }, 100001);

  console.log(ans);
}
