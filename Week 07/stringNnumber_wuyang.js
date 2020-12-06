function StringToNumber (string) {
    const decimalPattern = /^([\+\-])?(\d+)?(?:\.(\d*))?(?:e([+-]?)(\d+))?$/i;
    const binaryPattern = /^([\+\-])?0b([0-1]+)$/i;
    const octalPattern = /^([\+\-])?0o([0-7]+)$/i;
    const hexadec/imalPattern = /^([\+\-])?0x([0-9a-f]+)$/i;

    const charMapping = {
        '0': 0, '1': 1, '2': 2, '3': 3,
        '4': 4, '5': 5, '6': 6, '7': 7, 
        '8': 8, '9': 9, 'a': 10, 'b': 11, 
        'c': 12, 'd': 13, 'e': 14, 'f': 15, 
    }

    const decodeNumber = function (numberString, radix, fractionalFlag) {
        let result = 0;
        numberString = numberString.toLowerCase();
        for (let offset = 0; offset < numberString.length; offset++) {
            let curentChar = numberString[offset];
            let exponent = fractionalFlag
                ? -1 * ( offset + 1 )
                : numberString.length - ( offset + 1 );
            result += charMapping[curentChar] * Math.pow(radix, exponent);
        }
        return result;
    }

    if (typeof string !== 'string') {
        return NaN;
    }

    let radix, matches, sign, integer = '', fraction = '', exponentSign = 1, exponent = '', result = 0;

    if (matches = string.match(decimalPattern)) {
        radix = 10;
        fraction = matches[3] || '';
        exponentSign =  matches[4] === '-' ? -1 : 1;
        exponent = matches[5] || '';
    } else if (matches = string.match(hexadecimalPattern)) {
        radix = 16;
    } else if (matches = string.match(binaryPattern)) {
        radix = 2;
    } else if (matches = string.match(octalPattern)) {
        radix = 8;
    } else {
        return NaN;
    }

    sign = matches[1] === '-' ? -1 : 1;
    integer = matches[2];

    result += decodeNumber(integer, radix, false) 
    result += decodeNumber(fraction, radix, true)
    return exponentSign > 0 
        ? sign * result * Math.pow(radix, decodeNumber(exponent, radix, false))
        : sign * result / Math.pow(radix, decodeNumber(exponent, radix, false));
}

function NumberToString (number, radix) {
    const encodeDictionary = '0123456789abcdef';

    const encodeNumberInterger = function (input, radix) {
        let result = '';
        while (input > 0) {
            let encodeNumber = input % radix;
            result = encodeDictionary[encodeNumber] + result
            input = Math.floor(input / radix);
        }
        return result;
    }

    const encodeNumberFraction = function (input, radix) {
        let result = '';
        let errorFactor = 1

        if (Math.log2(radix) % 1) {
            errorFactor = number;
        }

        while (
            input > Number.EPSILON * errorFactor * Math.pow(radix, result.length + 1) &&
            input < 1 - Number.EPSILON * errorFactor * Math.pow(radix, result.length + 1)
        ) {
            input = input * radix;
            let encodeNumber = Math.floor(input);
            input = input % 1;

            if (input >= 1 - Number.EPSILON * errorFactor * Math.pow(radix, result.length + 1)) {
                encodeNumber++
            }

            result += encodeDictionary[encodeNumber];
        }
        return result;
    }

    if (typeof number !== 'number' || typeof radix !== 'number' ) {
        // throw an error, anyone of parameters shold be a number
        return null;
    }

    if (radix > encodeDictionary.length || radix <= 1) {
        // throw an error, radix should not over dictionary defines
        return null;
    }
    let sign = number < 0 ? -1 : 1;
    number *= sign;
    let integer = Math.floor(number);
    let fraction = number % 1;

    let encodedInteger = encodeNumberInterger(integer, radix);
    let encodedFraction = encodeNumberFraction(fraction, radix);

    let result = ''
    result += encodedInteger.length > 0 ? encodedInteger : '0';
    result += encodedFraction.length > 0 ? '.' + encodedFraction : '';
    return sign < 0 ? '-' + result : result;
}

console.log(
    StringToNumber('12345'), // 12345
    StringToNumber('12345.5'), // 12345.5
    StringToNumber('-12345.'), // -12345
    StringToNumber('12345.5E1'), // 123455
    StringToNumber('12345.5E-1'), // 123455
    StringToNumber('1234.E'), // NaN
    StringToNumber('0b011'), // 3
    StringToNumber('0o77'), // 63
    StringToNumber('0xfF'), // 255
)

console.log(
    NumberToString(12345, 10), // 12345
    NumberToString(12345.5, 10), // 12345.5
    NumberToString(-12345, 10), // -12345
    NumberToString(123455, 10), // 123455
    NumberToString(1234.55, 10), // 1234.55
    NumberToString(3, 2), // 11
    NumberToString(63, 8), // 77
    NumberToString(255, 16), // ff
    NumberToString(11.3, 2), // 1011.010011001100110011001100110011001100110011001101
    NumberToString(11.3, 8), // 13.2314631463146315
    NumberToString(11.3869784123, 10), // 11.3869784123
    NumberToString(11.3, 16), // b.4ccccccccccd
)