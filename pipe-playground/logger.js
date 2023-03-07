const fs = require('fs');

const { PassThrough } = require('stream');

const readable = fs.createReadStream('./my-file.txt', { highWaterMark: 20 });

class Logger extends PassThrough {
  writable;
  // time stamp versions of files so can see before after like a button color changes

  constructor() {
    super();
    this.writable = fs.createWriteStream('log.txt', { highWaterMark: 20 });
  }

  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    this.writable.write(chunk);
    callback();
  }

  _final() {
    this.push(null);
  }
}

/*
class Logger extends PassThrough {
	writeStream: WriteStream
	// time stamp versions of files so can see before after like a button color changes

	constructor() {
		super()
		// timestamp and send logs to different
		this.writeStream = fs.createWriteStream(
			path.join(packageDirs.cliCore, `./logs/${Date.now()}.txt`),
			{
				highWaterMark: 20
			}
		)
	}

	_read() {
		// noop
	}

	_write(
		chunk: any,
		encoding: BufferEncoding,
		callback: (error?: Error | null) => void
	): void {
		this.push(chunk)
		this.writeStream.write(decompressResponse(chunk))
		callback()
	}

	_final() {
		this.push(null)
	}
}
*/

const log = new Logger();
const writable = fs.createWriteStream('logger-my-file.txt');

readable.pipe(log).pipe(writable);
