const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const str = input[line++];

const map = {};

[...str].forEach((char) => {
  if (map[char]) {
    map[char]++;
  } else {
    map[char] = 1;
  }
});

let prefix = '';
let center = '';
Object.keys(map).forEach((key) => {
  if (map[key] % 2) {
    if (center !== '') {
      console.log("I'm Sorry Hansoo");
      process.exit();
    }

    center = key;
    map[key] -= 1;
  }

  const num = Math.round(map[key] / 2);

  [...new Array(num)].forEach(() => (prefix += key));
});

prefix = [...prefix].sort().join('');

console.log(prefix + center + [...prefix].reverse().join(''));
