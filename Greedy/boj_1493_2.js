const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const cubes = new Array(20).fill(0);

const [length, width, height] = input[line++].split(' ').map(Number);
const n = +input[line++];
for (let i = 0; i < n; i++) {
  const [a, b] = input[line++].split(' ').map(Number);
  cubes[a] = b;
}

let used = 0;
let ans = 0;

for (let i = 19; i >= 0; i--) {
  used *= 8;

  const required =
    Math.floor(length / 2 ** i) *
      Math.floor(width / 2 ** i) *
      Math.floor(height / 2 ** i) -
    used;

  used += Math.min(required, cubes[i]);
  ans += Math.min(required, cubes[i]);
}

if (used !== width * length * height) console.log(-1);
else console.log(ans);
