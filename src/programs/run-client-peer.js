/*
  NOTE(Alan):

  Main entry point of the client peer,
  should handle all I/O between user and program.
*/

import { ClientPeer } from "../peers/client-peer.js"

const peer = await ClientPeer.create()

// NOTE(Alan): For testing purposes, send a build request every 10s
const interval = setInterval(() => {
  peer.requestBuild()
}, 10000)

const stop = async () => {
  clearInterval(interval)

  await peer.stop()

  process.exit(0)
}

process.on("SIGTERM", stop)
process.on("SIGINT", stop)
