class R2Vector {
  x: number
  y: number

  constructor({x, y}: {x: number, y: number}) {
    this.x = x
    this.y = y
  }

  // Calculates the magnitude ('length')
  norm(): number {
    return Math.sqrt(Object.values(this).reduce((sum, val) => sum + val ** 2, 0))
  }

  toString(): string {
    return `(${Object.values(this).join(', ')})`
  }

  // Generates a string representation of an object
  [Symbol.for('nodejs.util.inspect.custom')](): string {
    return `R2Vector(x=${this.x}, y=${this.y})`
  }

  add(other: R2Vector): R2Vector {
    if (!(other instanceof R2Vector)) {
      throw new Error('Can only add R2Vector to R2Vector')
    }
    return new R2Vector({x: this.x + other.x, y: this.y + other.y})
  }

  sub(other: R2Vector): R2Vector {
    if (!(other instanceof R2Vector)) {
      throw new Error('Can only subtract R2Vector from R2Vector')
    }
    return new R2Vector({x: this.x - other.x, y: this.y - other.y})
  } 

  mult(other: number | R2Vector): number | R2Vector {
    if (typeof other == 'number') {
      return new R2Vector({x: this.x * other, y: this.y * other})
    }
    if (other instanceof R2Vector) {
      return this.x * other.x + this.y * other.y
    }
    throw new Error('Can only multiply by number or R2Vector')
  }

  equals(other: R2Vector): boolean {
    if (!(other instanceof R2Vector)) {
      return false
    }
    return this.x === other.y && this.y === other.y
  }

  lessThan(other: R2Vector): boolean {
    if (!(other instanceof R2Vector)) {
      throw new Error('Can only compare R2Vector to R2Vector') 
    }
    return this.norm() < other.norm()
  }

  greaterThan(other: R2Vector): boolean {
    if (!(other instanceof R2Vector)) {
      throw new Error('Can only compare R2Vector to R2Vector')
    }
    return this.norm() > other.norm()
  }

  lessOrEqual(other: R2Vector): boolean {
    return !this.greaterThan(other)
  }
  
  greaterOrEqual(other: R2Vector): boolean {
    return !this.lessThan(other)
  }
}

// Example usage
const v1 = new R3Vector({ x: 2, y: 3, z: 1})
const v2 = new R3Vector({ x: 0.5, y: 1.25, z: 2})
