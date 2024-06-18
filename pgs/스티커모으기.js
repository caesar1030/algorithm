function solution(sticker) {
  if (sticker.length === 1) return sticker[0];
  if (sticker.length === 2) return Math.max(...sticker);
  if (sticker.length === 3)
    return Math.max(sticker[1], sticker[0] + sticker[2]);

  let ans = 0;

  // 항상 처음을 고르는 경우
  // 두번째와 마지막은 제외됨 나머지에서 dp 구하기
  let arr = sticker.slice(2, sticker.length - 1);
  let dp = new Array(arr.length).fill(0);

  dp[0] = arr[0];
  dp[1] = Math.max(arr[1], dp[0]);
  dp[2] = Math.max(dp[0] + arr[2], dp[1]);

  for (let i = 3; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 3] + arr[i], dp[i - 2] + arr[i], dp[i - 1]);
  }

  // dp에 처음값 더하기
  ans = dp[arr.length - 1] + sticker[0];

  // 처음을 고르지 않는 경우
  // 첫번째만 제외됨
  arr = sticker.slice(1);
  dp = new Array(arr.length).fill(0);

  dp[0] = arr[0];
  dp[1] = Math.max(arr[1], dp[0]);
  dp[2] = Math.max(dp[0] + arr[2], dp[1]);

  for (let i = 3; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 3] + arr[i], dp[i - 2] + arr[i], dp[i - 1]);
  }

  ans = Math.max(dp[arr.length - 1], ans);

  return ans;
}
