const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const [n, m] = input[line++].split(' ').map(Number);

const arr = new Array(n).fill(null);

for (let i = 0; i < n; i++) {
  arr[i] = input[line++].split(' ').map(Number);
}

const k = +input[line++];

const psum = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    psum[i][j] =
      psum[i - 1][j] + psum[i][j - 1] + arr[i - 1][j - 1] - psum[i - 1][j - 1];
  }
}

for (let t = 0; t < k; t++) {
  const [i, j, x, y] = input[line++].split(' ').map(Number);

  const ans = psum[x][y] - psum[x][j - 1] - psum[i - 1][y] + psum[i - 1][j - 1];
  console.log(ans);
}
