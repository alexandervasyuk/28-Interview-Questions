/* Given an integer array, find all pairs that sum to k 
	Is array sorted? - No.
	Duplicates? - Yes.
**/

var HashSet = require('./lib/hashset');

/* Solution 1 - Naive
	For every element in the array, travese every element checking whether the 
	sum of the two equals k.
	Time complexity: O(n^2)
**/
function pairsSumK1(a,k) {
	var r = []
		, dup = new HashSet();
	for (var i = 0; i < a.length-1; i++) {
		for (var j = i+1; j < a.length; j++) {
			if ((a[i] + a[j]) === k && !dup.contains(a[i])) { //checking one is enough
				dup.add(a[i]);
				dup.add(a[j]);
				r.push([a[i], a[j]]);
			}
		}
	}
	return r;
}

/* Solution 2 - Sort, then traverse from each end. 
	Sort the array first. Then traverse the array from each	end. If the current 
	sum is too large - decrease the right pointer. If it's too small - increase 
	the left. Just right - add to result and advance both.
	Time complexity: O(nlog(n)) due to sorting
**/

function sortNum(a,b) {
	return a - b; 
}

function pairsSumK2(a,k) {
	var result = []
		, l = 0
		, r = a.length - 1
		, dup = new HashSet();

	a.sort(sortNum);

	while( l < r ) {
		//Remove duplicates from left
		while (dup.contains(a[l]) && l < r) {
			l += 1;
		}

		//Remove duplicates from right
		while (dup.contains(a[r]) && l < r) {
			r -= 1;
		}

		var sum = a[l] + a[r];
		if (sum == k) {
			result.push([a[l], a[r]]);
			dup.add(a[l]);
			dup.add(a[r]);
			l += 1;
			r -= 1;
		} else if (sum < k) {
			dup.add(a[l]);
			l += 1;
		} else {
			dup.add(a[r]);
			r -= 1;
		}
	}

	return result;
}

/* Solution 3 - Use a set. 
	Add all elements to the set. Iterate over array, checking if element's 
	potential complementary term is in set. If so - add to set. 
	Automatically takes care of duplicates.
	Time complexity: O(n)
**/
function pairsSumK3(a, k) {
	var set = new HashSet()
		, r = [];

	set.addAll(a);

	for (var i = 0; i < a.length; i++) {
		var v = k - a[i];

		if (set.contains(v)) {
			r.push([ a[i], v ]);
			set.remove(v);
			set.remove(a[i]);
		}
	}

	return r;
}