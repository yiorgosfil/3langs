var NUMBER_OF_DISKS = 5;
var range = function (start, end, step) {
    var arr = [];
    if (step > 0) {
        for (var i = start; i < end; i += step) {
            arr.push(i);
        }
    }
    else {
        for (var i = start; i > end; i += step) {
            arr.push(i);
        }
    }
    return arr;
};
var A = range(NUMBER_OF_DISKS, 0, -1);
var B = [];
var C = [];
function move(n, source, auxiliary, target) {
    if (n <= 0) {
        return;
    }
    // Move n - 1 disks from source to the auxiliary, so they are out of the way 
    move(n - 1, source, target, auxiliary);
    // Move the nth disk from source to target 
    target.push(source.pop());
    // Display progress 
    console.log(A, B, C, '\n');
    // Move the n - 1 disks left on auxiliary to the target 
    move(n - 1, auxiliary, source, target);
}
move(NUMBER_OF_DISKS, A, B, C);
