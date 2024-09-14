const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

const ans = [];
while (t--) {
  const n = +input[line++];

  const map = {};
  for (let i = 0; i < n; i++) {
    const [_, key] = input[line++].split(' ');

    if (map[key]) {
      map[key] += 1;
    } else {
      map[key] = 1;
    }
  }

  let temp = 1;
  Object.keys(map).forEach((key) => {
    temp *= map[key] + 1;
  });

  ans.push(temp - 1);
}

console.log(ans.join('\n'));
