/* Given a linkedlist of integers and an integer value, delete every node of 
the linkedlist containing that value.
**/

function LinkedList() {
	this.head = null;
	this.tail = null;
}

LinkedList.prototype.push = function(o) {
	var node = {
		  data : o
		, next : null
	}

	if (!this.head) {
		this.head = node;
		this.tail = this.head;
	} else {
		this.tail.next = node;
		this.tail = this.tail.next;
	}
}

LinkedList.prototype.remove = function(x) {
	var cur;

	if (this.head == null) return;

	cur = this.head;

	while (cur && cur.data == x) {
		cur = cur.next;
		this.head = cur;
	}

	if (!cur) return;

	while(cur.next !== null) {
		if (cur.next.data == x) {
			cur.next = cur.next.next;
		} else {
			cur = cur.next;
		}
	}
}