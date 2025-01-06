function verifyCardNumber(cardNumber) {
    var sumOfOddDigits = 0;
    var sumOfEvenDigits = 0;
    var cardNumberCleaned = cardNumber.replace(/[- ]/g, '');
    var cardNumberReversed = cardNumberCleaned.split('').reverse();
    // Odd digits array
    for (var i = 0; i < cardNumberReversed.length; i += 2) {
        sumOfOddDigits += parseInt(cardNumberReversed[i]);
    }
    // Even digits array 
    for (var i = 1; i < cardNumberReversed.length; i += 2) {
        var number = parseInt(cardNumberReversed[i]) * 2;
        if (number > 9) {
            number = Math.floor(number / 10) + (number % 10);
        }
        sumOfEvenDigits += number;
    }
    var total = sumOfOddDigits + sumOfEvenDigits;
    return total % 10 === 0;
}
function getVerification() {
    var cardNumber = '4111-1111-4555-1142';
    if (verifyCardNumber(cardNumber)) {
        return 'VALID';
    }
    else {
        return 'INVALID';
    }
}
console.log(getVerification());
