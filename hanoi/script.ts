const NUMBER_OF_DISKS: number = 5

const range = (start: number, end: number, step: number): number[] => {
  const arr: number[] = []

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      arr.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      arr.push(i)
    }
  }
  return arr
}
const A: number[] = range(NUMBER_OF_DISKS, 0, -1)
const B: number[] = []
const C: number[] = []

function move(
  n: number,
  source: number[],
  auxiliary: number[],
  target: number[]): number[] | undefined {
  if (n <= 0) {
    return
  }

  // Move n - 1 disks from source to the auxiliary, so they are out of the way 
  move(n - 1, source, target, auxiliary)

  // Move the nth disk from source to target 
  target.push(source.pop()!)

  // Display progress 
  console.log(A, B, C, '\n')

  // Move the n - 1 disks left on auxiliary to the target 
  move(n - 1, auxiliary, source, target)
}

move(NUMBER_OF_DISKS, A, B, C)
