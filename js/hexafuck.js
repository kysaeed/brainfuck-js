'use strict';

var getInput = function() {
    // TODO: input
    return 0;
};

var hexafuck = function(code) {
    const commandList = ['>', '<', '+', '-', '.', ',', '[', ']'];
    const MemorySize = 3000;
    var result = '';
    var programCounter = 0;
    var pointer = 0;
    var memory = new Array(MemorySize);
    for (var i = 0; i < MemorySize; i++) {
        memory[i] = 0;
    }

    var getCommand = function(programCount) {
        const commandList = ['>', '<', '+', '-', '.', ',', '[', ']'];
        var charPosition = Math.floor(programCount * 3 / 4);
        var shiftCounter = (programCount * 3) % 4;
        var hexa = parseInt(code.charAt(charPosition), 16);

        var command = (hexa >> shiftCounter);
        if (shiftCounter > 1) {
            var hexaRemain = parseInt(code.charAt(charPosition + 1), 16);
            command |= hexaRemain << (4 - shiftCounter);
        }
        command &= 0x07;

        return commandList[command];
    };

    var len = Math.floor(code.length * 4 / 3);
    while (programCounter < len) {
        var command = getCommand(programCounter);
        switch (command) {
            case '>':
                pointer++;
                if (pointer > MemorySize) {
                    MemorySize = MemorySize;
                }
                break;
            case '<':
                pointer--;
                if (pointer < 0) {
                    pointer = 0;
                }
                break;
            case '+':
                memory[pointer]++;
                break;
            case '-':
                memory[pointer]--;
                break;
            case '.':
                result += String.fromCharCode(memory[pointer]);
                break;
            case ',':
                memory[pointer] = getInput();
                break;
            case '[':
                if (memory[pointer] == 0) {
                    var nestCount = 0;
                    while (true) {
                        programCounter++;
                        if (getCommand(programCounter) == ']') {
                            if (nestCount <= 0) {
                                break;
                            } else {
                                nestCount--;
                            }
                        }
                        if (getCommand(programCounter) == '[') {
                            nestCount++;
                        }
                        if (programCounter >= len) {
                            programCounter = len;
                            break;
                        }
                    }
                }
                break;
            case ']':
                if (memory[pointer] != 0) {
                    var nestCount = 0;
                    while (true) {
                        programCounter--;
                        if (getCommand(programCounter) == '[') {
                            if (nestCount <= 0) {
                                break;
                            } else {
                                nestCount--;
                            }
                        }
                        if (getCommand(programCounter) == ']') {
                            nestCount++;
                        }
                        if (programCounter < 0) {
                            programCounter = 0;
                            break;
                        }
                    }
                }
                break;
        }
        programCounter++;
    }
    return result;
};

console.log('result = "' + hexafuck('294294234294290294294290294a42b380982942984944c8bd6bd6bd6c84294217bd6bd8298bd6b17bd6bd8011')  + '"');
