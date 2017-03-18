'use strict';

var _parser = require('./parser.js');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _parser2.default)('test.hl', function (ast, script) {
    console.log(script + '\n-----------------------------------------------------------\n');
    console.log(ast);
}); //invoke
