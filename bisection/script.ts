// squareTarget: the number for which we want to find the square root 
// tolarance: the acceptable difference between the square of the approximate root value and the actual target value
// maxIterations: max number of iterations to perform, if the method doesn't converge to this limit assume the solution is not found
function squareRootBisection(squareTarget: number, tolerance: number = 1e-7, maxIterations: number = 100): number {
  let root: any | null = null

  if (squareTarget < 0) {
    throw new Error('ValueError: Square root of negative number is not defined in real numbers')
  }

  if (squareTarget == 1) {
    root = 1
    console.log(`The square root of ${squareTarget} is 1`)
  } else if (squareTarget == 0) {
    root = 0
    console.log(`The square root of ${squareTarget} is 0`)
  } else {
    let low: number = 0
    let high: number = Math.max(1, squareTarget)
    root = null

    for (let i = 0; i < maxIterations; i++) {
      let mid: number = (low + high) / 2
      let squareMid: number = mid * mid

      if (Math.abs(squareMid - squareTarget) < tolerance) {
        root = mid
        break
      } else if (squareMid < squareTarget) {
        low = mid
      } else {
        high = mid
      }
    }

    if (root == null) {
      console.log(`Failed to converge between ${maxIterations} iterations`)
    } else {
      console.log(`The square root of ${squareTarget} is approximately ${root}`)
    }
  }
  return root
}

squareRootBisection(16)
squareRootBisection(1894903870134906)
