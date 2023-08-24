const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');

const n = +input[0];
const arr = input[1].split(' ').map(Number);
let ans = 0;

const permutaition = (start) => {
  if (start === n) {
    const temp = arr.reduce((acc, cur, idx) => {
      if (idx === n - 1) return acc;

      return acc + Math.abs(arr[idx] - arr[idx + 1]);
    }, 0);

    ans = Math.max(ans, temp);

    return;
  }

  for (let i = start; i < n; i++) {
    [arr[i], arr[start]] = [arr[start], arr[i]];
    permutaition(start + 1);
    [arr[i], arr[start]] = [arr[start], arr[i]];
  }
};

const main = () => {
  permutaition(0);
  console.log(ans);
};

main();
