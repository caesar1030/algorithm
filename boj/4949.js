const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const ans = [];

while (true) {
  const str = input[line++];
  if (str === '.') {
    break;
  }

  const stack = [];
  let flag = true;

  [...str].forEach((char) => {
    if (char === '(') {
      stack.push('(');
    }

    if (char === '[') {
      stack.push('[');
    }

    if (char === ')') {
      if (stack.length && stack[stack.length - 1] === '(') {
        stack.pop();
      } else {
        flag = false;
      }
    }

    if (char === ']') {
      if (stack.length && stack[stack.length - 1] === '[') {
        stack.pop();
      } else {
        flag = false;
      }
    }
  });

  if (stack.length) flag = false;

  ans.push(flag ? 'yes' : 'no');
}

console.log(ans.join('\n'));
