/* Find the missing element
There is an array of non-negative integers. A second array is formed by 
shuffling the elements of the first array and deleting a random element.
Given these two arrays, find which element is missing in the second array.
**/

/* Solution - Naive
Sort both arrays. Compare elements until two mismatch.
Time: O(nlogn)
**/

/* Solution - hashtable.
Make two passes of the arrays. One pass counts occurences of elements in the
first array. Second subtracts from this count. Once you hit an element with 0
- this is it.
Time: O(N), but space also O(N) because of the hashtable.
**/

/* Solution - XOR
XOR all elements from both arrays. 
x ^ x = 0
0 ^ x = x
**/
 
function findMissingElement(a1, a2) {
	var a = a1.concat(a2);

	var r = 0;

	for (var i in a) {
		r = r ^ a[i];
	}

	return r;
}



