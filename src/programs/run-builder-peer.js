/*
  NOTE(Alan):

  Main entry point of the builder peer,
  should handle all I/O between user and program.
*/

import { BuilderPeer } from "../peers/builder-peer.js"

const peer = await BuilderPeer.create()

const stop = async () => {
  await peer.stop()

  process.exit(0)
}

process.on("SIGTERM", stop)
process.on("SIGINT", stop)
