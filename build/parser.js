'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parse;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parse(fileName, callback) {
    var tokenized = [];
    _fs2.default.readFile(fileName, 'utf-8', function (err, script) {
        callback(tokenize(script), script);
    });
}

/*
parse('test.hl', (ast, script) => {
    console.log(`${script}\n-----------------------------------------------------------\n`);
    console.log(ast);
});
*/

var Declaration = function Declaration(name, value) {
    _classCallCheck(this, Declaration);

    this.name = name;
    this.value = value;
};

var CallFunc = function CallFunc(funcName) {
    _classCallCheck(this, CallFunc);

    this.funcName = funcName;
};

var FunctionLine = function FunctionLine(type, value) {
    _classCallCheck(this, FunctionLine);

    this.type = type;
    this.value = value;
};

var Function = function Function(name) {
    _classCallCheck(this, Function);

    this.name = name;
    //this.lines = lines;
    //this.value = value;
};

function tokenize(script) {
    var ast = [];
    var lines = script.split('\n');
    lines.forEach(function (line, index) {
        if (line.split(' ')[0] == 'let') {
            ast.push(declare(line));
        } else if (line.split(' ')[0] == 'func') {
            var funcLines = [];
            var counter = index++;
            var name = line.split(' ')[1].split('()')[0];
            while (!lines[counter].includes('}')) {
                funcLines.push(lines[counter]);
                counter++;
            }
            ast.push(declareFunc(name, funcLines));
        }
    });
    //console.log(ast);
    return ast;
}

function declare(line) {
    var dec = line.split(' ');
    var name = dec[1];
    var value = dec[3].split('"')[1];
    return new Declaration(name, value);
}

function callFunction(name) {
    return new CallFunc(name);
}

function declareFunc(name, lines) {
    var func = new Function(name);
    var parsedLines = [];
    lines.forEach(function (line) {
        if (line.split(' ')[4] == 'let') {
            parsedLines.push(declare(line));
        } else if (line.split(' ')[0].includes('()')) {
            parsedLines.push(callFunction(line.split('()')[0]));
        } else if (line.split(' ')[0].includes('return')) {
            func.value = line.split(' ')[1];
        }
    });
    //console.log(lines);
    func.lines = parsedLines;
    func.value = null;
    return func;
}
