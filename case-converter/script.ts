function convertToSnakeCase(str: string): string {
  const snakeCaseCharList: string[] = []

  for (const char of str) {
    if (/^[A-Z]$/.test(char)) {
      const convertedCharacter = '_' + char.toLowerCase()
      snakeCaseCharList.push(convertedCharacter)
    } else {
      snakeCaseCharList.push(char)
    }
  }

  const snakeCasedString = snakeCaseCharList.join('')

  if (snakeCasedString[0] === '_') {
    return snakeCasedString.slice(1)
  } else if (snakeCasedString[snakeCasedString.length - 1] === '_') {
    return snakeCasedString.slice(0, -1)
  } else {
    return snakeCasedString
  }
}

console.log(convertToSnakeCase('aLongAndComplexString'))
console.log(convertToSnakeCase('IAmAPascalCasedString'))
