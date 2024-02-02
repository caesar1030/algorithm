const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  const n = +input[line++];

  const numbers = [...new Array(n)].map((_, idx) => idx + 1);
  const ops = [];

  const dfs = (depth) => {
    if (depth === n) {
      // 식 만들기
      const arr = numbers.reduce((acc, cur, idx) => {
        if (idx === n - 1) {
          return [...acc, cur];
        }
        return [...acc, cur, ops[idx]];
      }, []);

      // 식 계산
      const acc = [...arr.filter((el) => el !== ' ').join('')].reduce(
        (acc, cur) => {
          if (cur === '+') {
            return {
              val: 0,
              op: 1,
              sum: acc.sum + acc.val,
            };
          }
          if (cur === '-') {
            return {
              val: 0,
              op: -1,
              sum: acc.sum + acc.val,
            };
          }

          val = acc.val * 10 + +cur * acc.op;
          return { ...acc, val };
        },
        {
          val: 0,
          op: 1,
          sum: 0,
        }
      );

      // 만약 0이면 출력
      if (acc.sum + acc.val === 0) {
        console.log(arr.join(''));
      }

      return;
    }

    for (let x of [' ', '+', '-']) {
      ops.push(x);
      dfs(depth + 1);
      ops.pop();
    }
  };

  dfs(1);
  console.log();
}
