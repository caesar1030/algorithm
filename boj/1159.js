const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const n = input[line++];

const map = {};
for (let i = 0; i < n; i++) {
  const alphabet = input[line++][0];

  if (!map[alphabet]) {
    map[alphabet] = 1;
  } else {
    map[alphabet] += 1;
  }
}

const ans = [];
for (const [key, value] of Object.entries(map)) {
  if (map[key] >= 5) {
    ans.push(key);
  }
}

ans.sort();
if (ans.length) console.log(ans.join(''));
else console.log('PREDAJA');
