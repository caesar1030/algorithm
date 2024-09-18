const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = +input[line++];
const arr = [];

for (let i = 0; i < n; i++) {
  const str = input[line++];
  arr.push(str);
}

const dq = (startY, startX, endY, endX) => {
  if (startY === endY && startX === endX) {
    return arr[startY][startX];
  }

  const halfY = (startY + endY) / 2;
  const halfX = (startX + endX) / 2;

  const leftUp = dq(startY, startX, Math.floor(halfY), Math.floor(halfX));
  const rightUp = dq(startY, Math.ceil(halfX), Math.floor(halfY), endX);
  const leftDown = dq(Math.ceil(halfY), startX, endY, Math.floor(halfX));
  const rightDown = dq(Math.ceil(halfY), Math.ceil(halfX), endY, endX);

  const res = leftUp + rightUp + leftDown + rightDown;

  if (res === '1111') return '1';
  if (res === '0000') return '0';

  return `(${res})`;
};

const ans = dq(0, 0, n - 1, n - 1);

console.log(ans);
