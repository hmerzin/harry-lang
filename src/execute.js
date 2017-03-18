//invoke
import parse from './parser.js';

parse('test.hl', (ast, script) => {
    console.log(`${script}\n-----------------------------------------------------------\n`);
    console.log(ast);
});