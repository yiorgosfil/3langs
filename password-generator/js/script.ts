import * as crypto from 'crypto'

function getRandomCharacter(chars: string): string {
  const array = new Uint8Array(1)
  crypto.randomFillSync(array)
  return chars[array[0] % chars.length]
}

function generatePassword(
  length: number = 16,
  nums = 1,
  specialChars: number = 1,
  uppercase: number = 1,
  lowercase: number = 1
): string {
  // Define the possible characters for the password
  const letters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits: string = '0123456789'
  const symbols: string = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  const allCharacters = letters + digits + symbols

  while (true) {
    let password: string = ''

    // Generate password 
    for (let i = 0; i < length; i++) {
      password += getRandomCharacter(allCharacters)
    }

    type Constraint = [number, RegExp]
    const constraints: Constraint[] = [
      [nums, /\d/g],
      [specialChars, new RegExp(`[${symbols}]`, 'g')],
      [uppercase, /[A-Z]/g],
      [lowercase, /[a-z]/g]
    ]

    const isValid = constraints.every(([constraint, pattern]: Constraint): boolean =>
      constraint <= (password.match(pattern) || []).length
    )

    if (isValid) {
      return password
    }
  }
}

console.log('Generated password: ', generatePassword())
