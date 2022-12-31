const fs =  require('fs');
const http = require('http');

const hello = 'Hello world';
console.log(hello);

const textInput = fs.readFileSync('./txt/input.txt', 'utf8');
console.log(textInput);

const textOut = `Information about avocado: ${textInput}\nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);

//Callback hell example
//err, data parameter pattern is common on Node.js
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', (err) => {
                console.log('Your file was successfully written');
            });
        });
    });
});
console.log('Will read the file');