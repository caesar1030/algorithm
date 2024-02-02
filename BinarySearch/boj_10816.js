const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().split('\n');
let line = 0;

const lb = (arr, target) => {
  let ans = -1;
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (arr[mid] < target) {
      l = mid + 1;
    } else if (arr[mid] > target) {
      r = mid - 1;
    } else {
      ans = mid;
      r = mid - 1;
    }
  }

  return ans;
};

const rb = (arr, target) => {
  let ans = -1;
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (arr[mid] > target) {
      r = mid - 1;
    } else if (arr[mid] < target) {
      l = mid + 1;
    } else {
      ans = mid;
      l = mid + 1;
    }
  }

  if (ans === -1) return ans;
  return ans + 1;
};

const n = +input[line++];
const arr = input[line++].split(' ').map(Number);
const m = +input[line++];
const arr2 = input[line++].split(' ').map(Number);

arr.sort((a, b) => a - b);

const ans = arr2.map((el) => rb(arr, el) - lb(arr, el)).join(' ');
console.log(ans);
