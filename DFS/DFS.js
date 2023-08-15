const grpah = [[], [2, 3], [1, 4], [1], [2]];

const visited = Array(5).fill(false);

const dfs = (v) => {
  visited[v] = true;
  console.log(v);

  for (i of grpah[v]) {
    if (!visited[i]) {
      dfs(i, visited);
    }
  }
};

dfs(1);
