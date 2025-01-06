function verifyCardNumber(cardNumber: string): boolean {
  let sumOfOddDigits: number = 0;
  let sumOfEvenDigits: number = 0;

  const cardNumberCleaned: string = cardNumber.replace(/[- ]/g, '')
  const cardNumberReversed: string[] = cardNumberCleaned.split('').reverse();

  // Odd digits
  for (let i = 0; i < cardNumberReversed.length; i += 2) {
    sumOfOddDigits += parseInt(cardNumberReversed[i]);
  }

  // Even digits
  for (let i = 1; i < cardNumberReversed.length; i += 2) {
    let number: number = parseInt(cardNumberReversed[i]) * 2;
    if (number > 9) {
      number = Math.floor(number / 10) + (number % 10)
    }
    sumOfEvenDigits += number
  }

  const total: number = sumOfOddDigits + sumOfEvenDigits;
  return total % 10 === 0;
}

function getVerification(): string {
  const cardNumber = '4111-1111-4555-1142'

  if (verifyCardNumber(cardNumber)) {
    return 'VALID'
  } else {
    return 'INVALID'
  }
}

console.log(getVerification())
