const fs = require('fs');

const readable = fs.createReadStream('./my-file.txt', { highWaterMark: 20 });

// Vanilla version
/*
let chunkCounter = 0;
readable.on('data', (chunk) => {
  if (chunkCounter === 2) {
    readable.pause();
    setTimeout(() => {
      readable.resume();
    }, 3 * 1000);
  }
  console.log('New chunk:', chunk.toString());
  chunkCounter++;
});
*/

// Iife version of readable streaming data
/*
(async () => {
  for await (const chunk of readable) {
    console.log('New chunk:', chunk.toString());
  }
})();
*/
