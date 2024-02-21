#include<bits/stdc++.h>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int n;
	cin >> n;

	vector<pair<int, int>> v;
	priority_queue<int, vector<int>, greater<int>> pq;
	for (int i = 0; i < n; i++) {
		int a, b;
		cin >> a >> b;

		v.push_back({ a,b });
	}

	sort(v.begin(), v.end());

	for (auto e : v) {
		pq.push(e.second);

		if (pq.size() > e.first) pq.pop();
	}

	int res = 0;
	while (pq.size()) {
		res += pq.top(); pq.pop();
	}

	cout << res;
}