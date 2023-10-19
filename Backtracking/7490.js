const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

let line = 0;
let t = +input[line++];

while (t--) {
  const n = +input[line++];

  const arr = [...new Array(n)].map((_, idx) => idx + 1);

  const removeEmpty = (string) => {
    return string.split(' ').join('');
  };

  const getSum = (string) => {
    let sum = 0;
    let temp = 0;
    let op = 1;
    [...string].forEach((char) => {
      if (char === '+') {
        sum += +temp * op;
        temp = 0;
        op = 1;
      } else if (char === '-') {
        sum += +temp * op;
        temp = 0;
        op = -1;
      } else {
        temp += char;
      }
    });

    if (temp) {
      sum += +temp * op;
    }

    return sum;
  };

  const ans = [];
  const dfs = (ops) => {
    if (ops.length === n - 1) {
      let str = '' + arr[0];

      ops.forEach((val, idx) => {
        str += val;
        str += '' + arr[idx + 1];
      });

      if (getSum(removeEmpty(str)) === 0) ans.push(str);

      return;
    }

    for (const op of [' ', '+', '-']) {
      dfs([...ops, op]);
    }
  };

  dfs([]);

  console.log(
    ans.reduce((acc, cur) => {
      return acc + cur + '\n';
    }, '')
  );
}
