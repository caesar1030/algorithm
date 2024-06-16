function solution(routes) {
  routes.sort((a, b) => a[0] - b[0]);

  let s = routes[0][0];
  let e = routes[0][1];

  let ans = 1;

  for (let i = 1; i < routes.length; i++) {
    const now = routes[i];

    if (now[0] > e) {
      ++ans;
      s = now[0];
      e = now[1];
    } else {
      s = now[0];
      e = Math.min(e, now[1]);
    }
  }

  return ans;
}
