package main 

import (
  "fmt"
  "strings"
)

var text string = "Hello Zaira"
var shift int = 3 

func caesar(message string, offset int) {
  alphabet := "abcdefghijklmnopqrstuvwxyz"
  encryptedText := ""

  for _, char := range strings.ToLower(message) {
    if char == ' ' {
      encryptedText += char
    } else {
      index := strings.Index(alphabet, char)
      newIndex = (index + offset) % len(alphabet)
      encryptedText += alphabet[newIndex]
    }
  }
  fmt.Println("plain text:", message)
  fmt.Println("encrypted text:", encryptedText)
}

func main() {
  fmt.Println(caesar(text, shift))
}

