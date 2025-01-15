function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var middlePoint = Math.floor(arr.length / 2);
    var leftPart = arr.slice(0, middlePoint);
    var rightPart = arr.slice(middlePoint, arr.length);
    mergeSort(leftPart);
    mergeSort(rightPart);
    var leftArrayIndex = 0;
    var rightArrayIndex = 0;
    var sortedIndex = 0;
    while (leftArrayIndex < leftPart.length && rightArrayIndex < rightPart.length) {
        if (leftPart[leftArrayIndex] < rightPart[rightArrayIndex]) {
            arr[sortedIndex] = leftPart[leftArrayIndex];
            leftArrayIndex += 1;
        }
        else {
            arr[sortedIndex] = rightPart[rightArrayIndex];
            rightArrayIndex += 1;
        }
        sortedIndex += 1;
    }
    while (leftArrayIndex < leftPart.length) {
        arr[sortedIndex] = leftPart[leftArrayIndex];
        leftArrayIndex += 1;
        sortedIndex += 1;
    }
    while (rightArrayIndex < rightPart.length) {
        arr[sortedIndex] = rightPart[rightArrayIndex];
        rightArrayIndex += 1;
        sortedIndex += 1;
    }
    return arr;
}
var numbers = [4, 10, 6, 14, 2, 1, 8, 5];
console.log("\n  Unsorted array: ".concat(numbers, "\n \n  Sorted array: ").concat(mergeSort(numbers), "\n\n\n  NOTE: With this implementation modifies the given arr in place\n  and I might consider capturing the recursive calls to:\n    const sortedLeft = mergeSort(leftPart)\n    const sortedRight = mergeSort(rightPart)\n"));
