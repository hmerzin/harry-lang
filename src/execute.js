// invoke
import parse from './parser';

parse('test.hl', (ast, script) => {
  console.log(`${script}\n\n-----------------------------------------------------------\n`);
  console.log(ast);
});
