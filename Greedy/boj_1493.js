const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [len, w, h] = input[line++].split(' ').map(Number);

const n = +input[line++];
const cubes = new Array(20).fill(0);

let cur;
for (let i = 0; i < n; i++) {
  const [a, b] = input[line++].split(' ').map(Number);
  cubes[a] = b;
  cur = a;
}

let ans = 0;
let used = 0;
for (let i = cur; i >= 0; i--) {
  used *= 8;
  const nowLine = 2 ** i;
  const required =
    Math.floor(len / nowLine) *
      Math.floor(w / nowLine) *
      Math.floor(h / nowLine) -
    used;

  const use = Math.min(required, cubes[i]);
  used += use;
  ans += use;
}

if (used !== len * w * h) console.log(-1);
else console.log(ans);
