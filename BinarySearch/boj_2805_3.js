const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);
const heights = input[line++].split(' ').map(Number);

let l = 0;
let r = Math.max(...heights);

const check = (mid) => {
  const sum = heights.reduce((acc, cur) => {
    const rest = cur - mid;
    return rest > 0 ? acc + rest : acc;
  }, 0);

  //   console.log(mid, sum);

  return sum >= m;
};

let ans = null;
while (l <= r) {
  const mid = Math.floor((l + r) / 2);
  //   console.log(mid, check(mid));

  if (check(mid)) {
    ans = mid;
    l = mid + 1;
  } else {
    r = mid - 1;
  }
}

console.log(ans);
