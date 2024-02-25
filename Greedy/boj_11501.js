const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  const n = +input[line++];
  const arr = input[line++].split(' ').map(Number);

  let temp = arr[n - 1];
  let ans = 0;
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] < temp) {
      ans += temp - arr[i];
    } else {
      temp = arr[i];
    }
  }

  console.log(ans);
}
