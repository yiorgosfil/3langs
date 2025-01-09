"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function getRandomCharacter(chars) {
    var array = new Uint8Array(1);
    crypto.randomFillSync(array);
    return chars[array[0] % chars.length];
}
function generatePassword(length, nums, specialChars, uppercase, lowercase) {
    if (length === void 0) { length = 16; }
    if (nums === void 0) { nums = 1; }
    if (specialChars === void 0) { specialChars = 1; }
    if (uppercase === void 0) { uppercase = 1; }
    if (lowercase === void 0) { lowercase = 1; }
    // Define the possible characters for the password
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var digits = '0123456789';
    var symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    var allCharacters = letters + digits + symbols;
    var _loop_1 = function () {
        var password = '';
        // Generate password 
        for (var i = 0; i < length; i++) {
            password += getRandomCharacter(allCharacters);
        }
        var constraints = [
            [nums, /\d/g],
            [specialChars, new RegExp("[".concat(symbols, "]"), 'g')],
            [uppercase, /[A-Z]/g],
            [lowercase, /[a-z]/g]
        ];
        var isValid = constraints.every(function (_a) {
            var constraint = _a[0], pattern = _a[1];
            return constraint <= (password.match(pattern) || []).length;
        });
        if (isValid) {
            return { value: password };
        }
    };
    while (true) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
console.log('Generated password: ', generatePassword());
