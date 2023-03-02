const fs = require('fs');

const {
  Transform,
  pipeline,
  Readable,
  Writable,
  PassThrough,
  Duplex,
  EventEmitter,
} = require('stream');
const readable = fs.createReadStream('./my-file.txt', { highWaterMark: 20 });
const writable = fs.createWriteStream('./capitalized-my-file.txt', {
  highWaterMark: 5,
});

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

const report = new PassThrough();
let totalSize = 0;
report.on('data', (chunk) => {
  totalSize += chunk.length;
  console.log('bytes:', totalSize);
});

/*
readable
  .pipe(uppercase)
  //   .on('error', () => {
  //     console.error(err);
  //   })
  .pipe(writable);
*/

class Throttle extends Duplex {
  delay;

  constructor(ms) {
    super();
    this.delay = ms;
  }

  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final() {
    this.push(null);
  }
}

class ReplaceText extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const transformedChunk = chunk.toString().toUpperCase();
    this.push(transformedChunk);
    callback();
  }
}

class DoubleText extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    let transformedChunk = [];

    const chunkString = chunk.toString();
    for (let i = 0; i < chunkString.length; i++) {
      transformedChunk.push(chunkString[i]);
      transformedChunk.push(chunkString[i]);
    }

    this.push(transformedChunk.join(''));
    callback();
  }
}

const throttle1 = new Throttle(50);
const throttle2 = new Throttle(50);
throttle1.setMaxListeners(15);

console.time();

const uppercaseClass = new ReplaceText();
const doubleClass = new DoubleText();

pipeline(
  readable,
  throttle1,
  // uppercase,
  uppercaseClass,
  doubleClass,
  throttle2,
  report,
  writable,
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

writable.on('close', () => {
  console.timeEnd();
});

/* streams with compression */
const zlib = require('zlib');
const crypto = require('crypto');
