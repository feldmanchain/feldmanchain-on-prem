/*
  NOTE(Alan):

  Stream utility function, for reading to/from a stream and to/from stdin.
  This code is copied from https://github.com/libp2p/js-libp2p/blob/master/examples/chat/src/stream.js
*/

import pipe from "it-pipe"
import lp from "it-length-prefixed"

// NOTE(Alan): Set the stdin encoding to utf8
const setStdinEncodingToUtf8 = () => process.stdin.setEncoding("utf8")

// NOTE(Alan): reads utf8 data from stdin and pipes it as encoded length-prefixed data to the {stream}
const stdinToStream = (stream) => {
  pipe(process.stdin, lp.encode(), stream.sink)
}

// NOTE(Alan): decodes length-prefixed data from the {stream} and writes it as utf8 to the console
const streamToConsole = (stream) => {
  pipe(stream.source, lp.decode(), consoleSink)
}

// NOTE(Alan): console sink function, read each chunk of data and output as a utf8 string to the console
const consoleSink = async (source) => {
  for await (const msg of source) {
    console.log("> " + msg.toString().replace("\n", ""))
  }
}

export { setStdinEncodingToUtf8, stdinToStream, streamToConsole }
