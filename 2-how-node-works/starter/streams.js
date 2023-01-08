const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1
    //the problem is that the file is read in the memory and then sent to the client
    //file is too big and the server will crash
    /*
    fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    });
    */

    //solution 2
    /*
    const readable = fs.createReadStream('test-file.txt');
    readable.on('data', (chunk) => {
        res.write(chunk);
    });
    readable.on('end', () => {
        res.end();
    });
    readable.on('error', (err) => {
        console.log(err);
        res.status = 500;
        res.end('File not found');
    });
    */

    //solution 3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //readableSource.pipe(writableDestination); we can say this is a duplex or a transform stream

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests');
});

