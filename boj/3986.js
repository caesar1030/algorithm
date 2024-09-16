const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];

let good = 0;
for (let i = 0; i < n; i++) {
  const word = input[line++];
  let flag = true;
  const st = [];
  [...word].forEach((char) => {
    if (!st.length) {
      st.push(char);
    } else if (st.at(-1) === char) {
      st.pop();
    } else {
      st.push(char);
    }
  });

  if (st.length) flag = false;

  if (flag) {
    good++;
  }
}

console.log(good);
