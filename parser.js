import fs from 'fs';

let ast = [];

export default function parse(fileName, callback) {
    let tokenized = [];
    fs.readFile(fileName, 'utf-8', (err, script) => {
        callback(tokenize(script), script);
    });
}

parse('test.hl', (ast, script) => {
    console.log(`${script}\n-----------------------------------------------------------\n`);
    console.log(ast);
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
    constructor(name) {
        this.name = name;
        //this.lines = lines;
        //this.value = value;
    }
}

function tokenize(script) {
    const lines = script.split('\n');
    lines.forEach((line, index) => {
        if(line.split(' ')[0] == 'let') {
            ast.push(declare(line));
        } else if(line.split(' ')[0] == 'func') {
            let funcLines = [];
            let counter = index ++;
            let name = line.split(' ')[1].split('()')[0];
            while(!lines[counter].includes('}')) {
                funcLines.push(lines[counter]);
                counter ++;
            }
            declareFunc(name, funcLines);
        }
    });
    //console.log(ast);
    return ast;
}

function declare(line) {
    const dec = line.split(' ');
    const name = dec[1];
    const value = dec[3].split('"')[1];
    return (new Declaration(name, value));
}

function callFunction(name) {
    return new CallFunc(name);
}

function declareFunc(name, lines) {
    let func = new Function(name);
    let parsedLines = [];
    lines.forEach(line => {
        if(line.split(' ')[4] == 'let') {
            parsedLines.push(declare(line));
        } else if (line.split(' ')[0].includes('()')) {
            parsedLines.push(callFunction(line.split('()')[0]));
        } else if(line.split(' ')[0].includes('return')) {
            func.value = line.split(' ')[1];
        }
    });
    //console.log(lines);
    func.lines = parsedLines;
    func.value = null;
    ast.push(func);
}