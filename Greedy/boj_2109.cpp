#include<bits/stdc++.h>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	vector<pair<int, int>> v;
	priority_queue<int, vector<int>, greater<int>> pq;

	int n;
	cin >> n;

	for (int i = 0; i < n; i++) {
		int a, b;
		cin >> a >> b;
		v.push_back({ b,a });
	}

	sort(v.begin(), v.end());


	for (int i = 0; i < n; i++) {
		pq.push(v[i].second);

		if (pq.size() > v[i].first) pq.pop();
	}

	int ans = 0;
	while (pq.size()) {
		ans += pq.top();
		pq.pop();
	}

	cout << ans;
}