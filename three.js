/* Given an array of integers find the largest continuous sum.
Don't forget that this inludes negative numbers.
**/

/* Solution 
Keep track of the current sum. Update the current term by taking the maximum of
the term plus next element and just the next element. 
Time complexity: O(N)
**/

function longestContSum(a) {
	if(a.length === 0) return;

	var maxSum = curSum = a[0];

	for (var i in a) {
		maxSum = Math.max(maxSum, curSum);
		curSum = Math.max(curSum + a[i], a[i]);
	}

	return maxSum;
}
