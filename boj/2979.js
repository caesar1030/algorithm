const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [p1, p2, p3] = input[line++].split(' ').map(Number);

const price = {
  0: 0,
  1: p1,
  2: p2,
  3: p3,
};

const arr = [...new Array(101)].map(() => 0);
for (let i = 0; i < 3; i++) {
  const [start, end] = input[line++].split(' ').map(Number);

  for (let j = start; j < end; j++) {
    arr[j] += 1;
  }
}

const ans = arr.reduce((acc, cur) => acc + price[cur] * cur, 0);

console.log(ans);
