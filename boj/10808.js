const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const str = input[line];
const arr = [...new Array(26)].map(() => 0);

const convertNumber = (char) => {
  const a = 'a'.charCodeAt(0);
  const charNum = char.charCodeAt(0);

  return charNum - a;
};

[...str].forEach((char, i) => {
  const idx = convertNumber(char);
  arr[idx] = arr[idx] + 1;
});

console.log(arr.join(' '));
