#include<bits/stdc++.h>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int n, k;
	cin >> n >> k;

	vector<pair<int, int>> vb;
	for (int i = 0; i < n; i++) {
		// a m b v
		int a, b;
		cin >> a >> b;
		vb.push_back({ a,b });
	}

	vector<int> vg;
	for (int i = 0; i < k; i++) {
		int a;
		cin >> a;
		vg.push_back(a);
	}

	sort(vb.begin(), vb.end());
	sort(vg.begin(), vg.end());

	priority_queue<int> pq;
	int i = 0;
	long long ans = 0;
	for (auto g : vg) {
		while (i < n && vb[i].first <= g) {
			pq.push(vb[i].second);
			i++;
		}
		if (pq.size()) {
			ans += pq.top(); pq.pop();
		}
	}
	cout << ans;

}