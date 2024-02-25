#include<bits/stdc++.h>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int n, m;
	cin >> n >> m;

	priority_queue<long long, vector<long long>, greater<long long>> pq;

	for (int i = 0; i < n; i++) {
		long long temp;
		cin >> temp;
		pq.push(temp);
	}

	for (int i = 0; i < m; i++) {
		long long a, b;
		a = pq.top(); pq.pop();
		b = pq.top(); pq.pop();

		pq.push(a + b);
		pq.push(a + b);
	}

	long long ans = 0;

	
	while (pq.size()) {
		ans += pq.top(); pq.pop();
	}

	cout << ans;
}