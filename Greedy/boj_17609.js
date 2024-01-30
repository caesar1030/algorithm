const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

const isPelin = (str) => {
  return str === str.split('').reverse().join('');
};

let ans;

while (t--) {
  const str = input[line++];

  if (isPelin(str)) {
    console.log(0);
    continue;
  }

  let flag = false;
  const n = str.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (str[i] === str[n - 1 - i]) continue;

    if (isPelin(str.slice(0, i) + str.slice(i + 1))) flag = true;
    if (isPelin(str.slice(0, n - i - 1) + str.slice(n - i))) flag = true;
    break;
  }

  if (!flag) ans = 2;
  else ans = 1;

  console.log(ans);
}
