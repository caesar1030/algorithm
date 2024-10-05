const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];
while (t--) {
  const str = input[line++].trim();

  const stack = [];

  let flag = true;

  [...str].forEach((char) => {
    if (char === '(') {
      stack.push(1);
    } else {
      if (stack.length === 0) flag = false;
      else stack.pop();
    }
  });

  if (stack.length !== 0) flag = false;

  console.log(flag ? 'YES' : 'NO');
}
