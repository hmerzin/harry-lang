import fs from 'fs';

let ast = [];

fs.readFile('./test.hl', 'utf-8', (err, script) => {
    console.log(script);
    tokenize(script);
});

class Declaration {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class CallFunc {
    constructor(funcName) {
        this.funcName = funcName;
    }
}

class FunctionLine {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Function {
    constructor(name, lines) {
        this.name = name;
        this.lines = lines;
    }
}

function tokenize(script) {
    const lines = script.split('\n');
    lines.forEach(line => {
        if(line.includes('let')) {
            ast.push(declare(line));
        } else if(line.includes('func')) {
            let funcLines = [];
            let lastIndex = lines.indexOf(line);
            let counter = lastIndex ++;
            let name = line.split(' ')[1].split('()')[0];
            while(!line.includes('}')) {
                funcLines.push(lines[counter]);
                counter ++;
            }
            declareFunc(name, lines);
        }
    });
    console.log(ast);
}

function declare(line) {
    const dec = line.split(' ');
    const name = dec[1];
    const value = dec[3].split('"')[1];
    return (new Declaration(name, value));
}

function declareFunc(name, lines) {
    lines.forEach(line => {
        if(line.contains('let')) {
            declare(line);
        } else if (line.contains('()')) {
            
        }
    })
}