<?php

$text = "Hello Zaira";
$shift = 3;
$alphabet = "abcdefghijklmnopqrstuvwxyz";

// Ceaser Implementation
function caesar($message, $offset)
{
    global $alphabet;
    $encryptedText = "";
    $chars = str_split(strtolower($message));

    foreach ($chars as $char) {
        if ($char == " ") {
            $encryptedText .= $char;
        } else {
            $index = strpos($alphabet, $char);
            $newIndex = ($index + $offset) % strlen($alphabet);
            $encryptedText .= $alphabet[$newIndex];
        }
    }
    echo $encryptedText . "\n\n";
}

caesar($text, $shift);

// Vigenere Implementation
$customKey = "python";

function vigenere($message, $key, $direction = 1)
{
    global $alphabet;
    $keyIndex = 0;
    $finalMessage = "";
    $chars = str_split(strtolower($message));

    foreach ($chars as $char) {
        if (!ctype_alpha($char)) {
            $finalMessage .= $char;
            continue;
        } else {
            $keyChar = $key[$keyIndex % strlen($key)];
            $keyIndex++;

            // Define the offset and the encrypted/decrypted letter
            $offset = strpos($alphabet, $keyChar);
            $index = strpos($alphabet, $char);
            $newIndex = ($index + $offset * $direction) % strlen($alphabet);
            $finalMessage .= $alphabet[$newIndex];
        }
    }
    echo $finalMessage;
}

vigenere($text, $customKey);
