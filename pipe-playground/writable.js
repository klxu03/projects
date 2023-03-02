const fs = require('fs');

const writable = fs.createWriteStream('my-new-file.txt');
writable.write('hello, ');
writable.end('world!');

const readable = fs.createReadStream('my-file.txt');
const readableWritable = fs.createWriteStream('copy-my-file.txt');
readable.pipe(readableWritable);
