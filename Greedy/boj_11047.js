const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [numMoneyValues, toMakeValue] = input[line++].split(' ').map(Number);
const moneyValues = [];

for (; line <= numMoneyValues; line++) {
  moneyValues.push(input[line]);
}

moneyValues.sort((a, b) => b - a);

let restMoney = toMakeValue;
let answer = 0;

moneyValues.forEach((value) => {
  if (restMoney === 0) return;

  const num = Math.floor(restMoney / value);
  if (num > 0) {
    restMoney -= num * value;
    answer += num;
  }
});

console.log(answer);
