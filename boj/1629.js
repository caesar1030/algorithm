const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [a, b, c] = input[line++].split(' ').map(BigInt);

const recursion = (_b) => {
  if (_b === BigInt(1)) {
    return a % c;
  }

  const half = Math.floor(Number(_b / BigInt(2)));
  let rv = recursion(BigInt(half));
  rv = ((rv % c) * (rv % c)) % c;

  if (_b % BigInt(2) === BigInt(1)) rv = ((rv % c) * (a % c)) % c;
  return rv;
};

console.log(recursion(b).toString().replace('n', ''));
