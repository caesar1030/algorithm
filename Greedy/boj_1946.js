const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

let t = +input[line++];

while (t--) {
  const n = +input[line++];

  const arr = [];
  for (let i = 0; i < n; i++) {
    const [a, b] = input[line++].split(' ').map(Number);
    arr.push([a, b]);
  }

  // 서류 순위
  arr.sort((a, b) => a[0] - b[0]);

  // 최소 면접
  let other = arr[0][1];
  let ans = 1;

  for (let i = 1; i < n; i++) {
    if (arr[i][1] >= other) continue;
    other = arr[i][1];
    ans++;
  }

  console.log(ans);
}
