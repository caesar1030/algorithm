const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

const check = (str) => {
  return str === str.split('').reverse().join('');
};

while (t--) {
  const str = input[line++];

  let l = 0;
  let r = str.length - 1;
  let ans = 0;
  while (l < r) {
    if (str[l] === str[r]) {
      l++;
      r--;
      continue;
    }

    if (
      check(str.slice(0, l) + str.slice(l + 1)) ||
      check(str.slice(0, r) + str.slice(r + 1))
    ) {
      ans = 1;
      break;
    } else {
      ans = 2;
      break;
    }
  }

  console.log(ans);
}
