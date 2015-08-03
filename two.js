/* Given a matrix of integers and coordinates of a rectangular region within 
the matrix, find the sum of numbers falling inside the rectangle. 
Will this calculation be done repeatedly? - Yes.
**/

/** Naive solution
	Go through each element within bounds.
	Time complexity: O(MN) M - number of rows in the matrix. N - number of columns in the matrix.
*/
function matrixRegionSum(matrix, start, end) {

	if (start.x < 0 || matrix.length < start.x) {
		throw new RegionOutBoundsException('X value of START coordinate is out of bounds');
	} else if (start.y < 0 || matrix[0].length < start.y) {
		throw new RegionOutBoundsException('Y value of START coordiante is out of bounds');
	} else if (end.x < 0 || matrix.length < end.x) {
		throw new RegionOutBoundsException('X value of EDN coordinate is out of bounds');
	} else if (end.y < 0 || matrix[0].length < end.y) {
		throw new RegionOutBoundsException('Y value of END coordiante is out of bounds');
	}

	var sum = 0;
	for (var i = start.x; i <= end.x; i++) {
		for (var j = start.y; j <= end.y; j++) {
			sum += matrix[i][j];
		}
	}
	return sum;
}

/** Solution 2 - Precompute every possible rectangle from the origin
	Precomputation time is not important - will only be done once at the start. 
	Space however will be O(MN), which is acceptable. To retrieve use this formula
	where A,B,C,D are each a point with x and y coordinates.
	Sum(ABCD) = Sum(OD) - Sum(OB) - Sum(OC) + Sum(OA). 
	Time complexity: O(1)
*/

var matrixRegionSum2 = (function(){
	var cache = null;

	function preprocess(matrix) {
		if (!cache) {
			cache = new Array(matrix.length);

			for (var i = 0; i < matrix.length; i++) {
				for (var j = 0; j < matrix[0].length; j++) {
					var N = retrieveVal(cache, i-1, j)
						, W = retrieveVal(cache, i, j-1)
						, NW = retrieveVal(cache, i-1, j-1)
						, X = matrix[i][j];

					if (typeof cache[i] === 'undefined') cache[i] = new Array(matrix[0].length);
					cache[i][j] =  N + W - NW + X;
				}
			}
		}
	}

	function retrieveVal(matrix, i, j) {

		if (typeof matrix[i] === "undefined" 
			|| typeof matrix[i][j] === "undefined") {
			return 0;
		} else {
			return matrix[i][j];
		}
	}

	return function(matrix, start, end) {
		preprocess(matrix);

		if (start.x === 0 && start.y === 0) {
			return cache[end.x][end.y]
		} else if (start.x === 0 && start.y !== 0) {
			return cache[end.x][end.y] - cache[start.x][end.y];
		} else if (start.x !== 0 && start.y === 0) {
			return cache[end.x][end.y] - cache[end.x][start.y];
		} else {
			start.x -= 1;
			start.y -= 1;
			return cache[end.x][end.y] 
				- cache[start.x][end.y]
				- cache[end.x][start.y]
				+ cache[start.x][start.y];
		}
	}
})();

function RegionOutBoundsException() {
	this.message = "Coordiante out of bounds";
	this.name = "RegionOutBoundsException";
}
