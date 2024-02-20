function solution(n, lost, reserve) {
  const arr = new Array(n + 1).fill(1);
  arr[0] = 0;

  reserve.forEach((r) => (arr[r] += 1));
  lost.forEach((l) => (arr[l] -= 1));

  arr.forEach((el, idx, arr) => {
    if (idx === 0) return;
    if (el === 2) {
      if (idx + 1 <= n && arr[idx + 1] === 0) {
        arr[idx] = 1;
        arr[idx + 1] = 1;
      }
    }

    if (el === 0) {
      if (idx + 1 <= n && arr[idx + 1] === 2) {
        arr[idx] = 1;
        arr[idx + 1] = 1;
      }
    }
  });

  return arr.filter((el) => el >= 1).length;
}
