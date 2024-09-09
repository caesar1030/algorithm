const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const str = input[line++];

const ans = [];
[...str].forEach((char) => {
  const code = char.charCodeAt(0);
  const aCode = 'a'.charCodeAt(0);
  const zCode = 'z'.charCodeAt(0);
  const ACode = 'A'.charCodeAt(0);
  const ZCode = 'Z'.charCodeAt(0);
  const alphabetNum = zCode - aCode + 1;
  if (code >= aCode && code <= zCode) {
    const charCode = ((code + 13 - aCode) % alphabetNum) + aCode;
    ans.push(String.fromCharCode(charCode));
  } else if (code >= ACode && code <= ZCode) {
    const charCode = ((code + 13 - ACode) % alphabetNum) + ACode;
    ans.push(String.fromCharCode(charCode));
  } else {
    ans.push(char);
  }
});

console.log(ans.join(''));
