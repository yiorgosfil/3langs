function mergeSort(arr: number[]): number[] | undefined {
  if (arr.length <= 1) {
    return arr
  }

  const middlePoint: number = Math.floor(arr.length / 2)
  const leftPart: number[] = arr.slice(0, middlePoint)
  const rightPart: number[] = arr.slice(middlePoint, arr.length)

  mergeSort(leftPart)
  mergeSort(rightPart)

  let leftArrayIndex = 0
  let rightArrayIndex = 0
  let sortedIndex = 0

  while (leftArrayIndex < leftPart.length && rightArrayIndex < rightPart.length) {
    if (leftPart[leftArrayIndex] < rightPart[rightArrayIndex]) {
      arr[sortedIndex] = leftPart[leftArrayIndex]
      leftArrayIndex += 1
    } else {
      arr[sortedIndex] = rightPart[rightArrayIndex]
      rightArrayIndex += 1
    }
    sortedIndex += 1
  }

  while (leftArrayIndex < leftPart.length) {
    arr[sortedIndex] = leftPart[leftArrayIndex]
    leftArrayIndex += 1
    sortedIndex += 1
  }

  while (rightArrayIndex < rightPart.length) {
    arr[sortedIndex] = rightPart[rightArrayIndex]
    rightArrayIndex += 1
    sortedIndex += 1
  }

  return arr
}

const numbers: number[] = [4, 10, 6, 14, 2, 1, 8, 5]
console.log(`
  Unsorted array: ${numbers}\n 
  Sorted array: ${mergeSort(numbers)}\n\n
  NOTE: With this implementation modifies the given arr in place
  and I might consider capturing the recursive calls to:
    const sortedLeft = mergeSort(leftPart)
    const sortedRight = mergeSort(rightPart)
  for a better implementation.
`)
