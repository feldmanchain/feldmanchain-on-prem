/*
  NOTE(Alan):

  Entrypoint of the program. Creates and starts a peer,
  also sets up handlers and dials in to listening peers.
*/

import * as logger from "./utility/log.js"
import * as streamer from "./utility/stream.js"
import { createNode } from "./create-node.js"

streamer.setStdinEncodingToUtf8()

const node = await createNode()

node.on("peer:discovery", async (peerId) => {
  logger.logDiscoveredInfo(peerId)
})

// NOTE(Alan): This gets fired when a peers protocol changes, this is the most logical place to dial into it
node.peerStore.on("change:protocols", async ({ peerId, protocols }) => {
  // NOTE(Alan): Do not connect to yourself
  if (peerId.toB58String() === node.peerId.toB58String()) {
    return
  }

  if (protocols.includes("/chat/1.0.0")) {
    const { stream } = await node.dialProtocol(peerId, "/chat/1.0.0")

    logger.logDialerInfo()

    streamer.stdinToStream(stream)
    streamer.streamToConsole(stream)
  }
})

await node.handle("/chat/1.0.0", async ({ stream }) => {
  streamer.stdinToStream(stream)
  streamer.streamToConsole(stream)
})

await node.start()

logger.logNodeStartedInfo(node)

const stop = async () => {
  await node.stop()

  logger.logStoppedMessage()

  process.exit(0)
}

process.on("SIGTERM", stop)
process.on("SIGINT", stop)
