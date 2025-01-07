function convertToSnakeCase(str) {
    var snakeCaseCharList = [];
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        if (/^[A-Z]$/.test(char)) {
            var convertedCharacter = '_' + char.toLowerCase();
            snakeCaseCharList.push(convertedCharacter);
        }
        else {
            snakeCaseCharList.push(char);
        }
    }
    var snakeCasedString = snakeCaseCharList.join('');
    if (snakeCasedString[0] === '_') {
        return snakeCasedString.slice(1);
    }
    else if (snakeCasedString[snakeCasedString.length - 1] === '_') {
        return snakeCasedString.slice(0, -1);
    }
    else {
        return snakeCasedString;
    }
}
console.log(convertToSnakeCase('aLongAndComplexString'));
console.log(convertToSnakeCase('IAmAPascalCasedString'));
