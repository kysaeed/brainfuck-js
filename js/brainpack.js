'use strict';

var brainpack = function(code) {
    const CommandBitCount = 3;
    const DigitBitCount = 4; // 0x0f is 4bytes
    const commandList = ['>', '<', '+', '-', '.', ',', '[', ']'];

    var result = '';
    var programCounter = 0;
    var hexa = 0;
    var shiftCounter = 0;
    while (programCounter < code.length) {
        var bitCommand = commandList.indexOf(code.charAt(programCounter));
        bitCommand = 0x01;
        if (bitCommand > -1) {
            hexa |= ((bitCommand & 0x07) << shiftCounter) & 0x0f;
            if (shiftCounter >= (DigitBitCount - CommandBitCount)) {
                result += hexa.toString(16);
                hexa = (bitCommand & 0x07) >> (DigitBitCount - shiftCounter);
            }
            shiftCounter += CommandBitCount;
            shiftCounter %= DigitBitCount;
        }
        programCounter++;
    }
    if (hexa > 0) {
        result += hexa.toString(16);
    }
    return result;
};


console.log('result = "' + brainpack('+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.') + '"');
// console.log('result = "' + brainpack('++') + '"');
