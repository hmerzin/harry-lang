'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ast = [];

_fs2.default.readFile('./test.hl', 'utf-8', function (err, script) {
    console.log(script);
    tokenize(script);
});

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

var Function = function Function(name, lines) {
    _classCallCheck(this, Function);

    this.name = name;
    this.lines = lines;
};

function tokenize(script) {
    var lines = script.split('\n');
    lines.forEach(function (line) {
        if (line.includes('let')) {
            ast.push(declare(line));
        } else if (line.includes('func')) {
            var funcLines = [];
            var lastIndex = lines.indexOf(line);
            var counter = lastIndex++;
            var name = line.split(' ')[1].split('()')[0];
            while (!line.includes('}')) {
                funcLines.push(lines[counter]);
                counter++;
            }
            declareFunc(name, lines);
        }
    });
    console.log(ast);
}

function declare(line) {
    var dec = line.split(' ');
    var name = dec[1];
    var value = dec[3].split('"')[1];
    return new Declaration(name, value);
}

function declareFunc(name, lines) {
    lines.forEach(function (line) {
        if (line.contains('let')) {
            declare(line);
        } else if (line.contains('()')) {}
    });
}
