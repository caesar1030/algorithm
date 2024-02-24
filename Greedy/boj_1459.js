const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [x, y, w, s] = input[line++].split(' ').map(Number);

let ans = 0;
if (s <= w * 2) {
  ans += Math.min(x, y) * s;

  if (s * 2 <= w * 2) {
    ans += Math.floor(Math.abs(x - y) / 2) * 2 * s;
    ans += (Math.abs(x - y) % 2) * w;
  } else {
    ans += Math.abs(x - y) * w;
  }
} else {
  ans = (x + y) * w;
}

console.log(ans);
