const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const numbers = input[1].split(' ').map(Number);
const ops = [];
let min = 1987654321;
let max = -1987654321;

const pushOp = (op, num) => {
  for (let i = 0; i < num; i++) {
    ops.push(op);
  }
};

const makeops = () => {
  input[2]
    .split(' ')
    .map(Number)
    .forEach((val, idx) => {
      if (idx === 0) {
        pushOp('+', val);
      }

      if (idx === 1) {
        pushOp('-', val);
      }

      if (idx === 2) {
        pushOp('*', val);
      }

      if (idx === 3) {
        pushOp('/', val);
      }
    });
};

const calcAndSaveAnswer = () => {
  const temp = ops.reduce((acc, cur, idx) => {
    const operand = numbers[idx + 1];
    if (cur === '+') return acc + operand;
    if (cur === '-') return acc - operand;
    if (cur === '*') return acc * operand;
    if (cur === '/')
      return acc >= 0 ? Math.floor(acc / operand) : Math.ceil(acc / operand);
  }, numbers[0]);

  max = Math.max(max, temp);
  min = Math.min(min, temp);
};

const permutaition = (fixed) => {
  if (fixed === ops.length) {
    calcAndSaveAnswer();
    return;
  }

  for (let i = fixed; i < ops.length; i++) {
    [ops[i], ops[fixed]] = [ops[fixed], ops[i]];
    permutaition(fixed + 1);
    [ops[i], ops[fixed]] = [ops[fixed], ops[i]];
  }
};

const main = () => {
  makeops();
  permutaition(0);

  console.log(max);
  console.log(min);
};

main();

// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');
// let n = Number(input[0]); // 수의 개수
// let arr = input[1].split(' ').map(Number); // 연산을 수행하고자 하는 수 리스트
// // 덧셈(+), 뺄셈(-), 곱셈(*), 나눗셈(/)의 연산자 개수
// let [add, sub, mul, div] = input[2].split(' ').map(Number);
// // 최솟값과 최댓값 초기화
// let minValue = 1e9;
// let maxValue = -1e9;
// // DFS 메서드 호출

// function dfs(index, value) {
//   if (index == n) {
//     minValue = Math.min(minValue, value);
//     maxValue = Math.max(maxValue, value);
//     return;
//   }
//   if (add > 0) {
//     add--;
//     dfs(index + 1, value + arr[index]);
//     add++;
//   }
//   if (sub > 0) {
//     sub--;
//     dfs(index + 1, value - arr[index]);
//     sub++;
//   }
//   if (mul > 0) {
//     mul--;
//     dfs(index + 1, value * arr[index]);
//     mul++;
//   }
//   if (div > 0) {
//     div--;
//     dfs(index + 1, ~~(value / arr[index])); // 나눌 때는 나머지를 제거 (C++14과 동일)
//     div++;
//   }
// }
// dfs(1, arr[0]);
// // 최댓값과 최솟값을 차례대로 출력
// console.log(maxValue);
// console.log(minValue);
