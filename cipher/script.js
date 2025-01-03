const text = 'Hello Zaira'
shift = 3

// Caesar Implementation
function caesar(message, offset) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
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
  console.log('plain text: ', message)
  console.log('encrypted text: ', encryptedText)
}

caesar(text, shift)

// Vigenere Implementation
const customKey = 'python'

function vigenere(message, key, direction = 1) {
  let keyIndex = 0
  alphabet = 'abcdefghijklmnopqrstuvwxyz'
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
      let index = alphabet.int
    }
  }

}
*/
