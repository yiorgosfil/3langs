const text = 'Hello Zaira'
shift = 3
const alphabet = 'abcdefghijklmnopqrstuvwxyzl'

// Caesar Implementation
function caesar(message, offset) {
  let encryptedText = ''

  for (char of message.toLowerCase()) {
    if (char == ' ') {
      encryptedText += char
    } else {
      let index = alphabet.indexOf(char)
      let newIndex = (index + offset) % alphabet.length
      encryptedText += alphabet[newIndex]
    }
  }
  return `Plain text: ${message}\nEncrypted text: ${encryptedText}`
}

console.log(caesar(text, shift))

// Vigenere Implementation
const customKey = 'python'

function vigenere(message, key, direction = 1) {
  let keyIndex = 0
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let finalMessage = ''

  for (char of message.toLowerCase()) {
    // Append any non-letter character to the message 
    if (!/^[a-zA-Z]+$/.test(char)) {
      finalMessage += char
    } else {
      // Find the right key character to encode/decode 
      let keyChar = key[keyIndex % key.length]
      keyIndex++

      // Define the offset and the encrypted/decrypted letter 
      let offset = alphabet.indexOf(keyChar)
      let index = alphabet.indexOf(char)
      let newIndex = (index + offset * direction) % alphabet.length
      finalMessage += alphabet[newIndex]
    }
  }
  return finalMessage
}

// console.log(vigenere(text, customKey))

/*
function encrypt(message, key) {
  return vigenere(message, key)
}

function decrypt(message, key) {
  return vigenere(message, key, -1)
}

const textToDecrypt = 'mrttaqrhknsw ih puggrur'
customKeyForDecryption = 'happycoding'

console.log(`Encrypted text: ${textToDecrypt}`)
console.log(`Key: ${customKeyForDecryption}`)

const decryptionII = decrypt(textToDecrypt, customKeyForDecryption)
console.log(decryptionII)
*/
