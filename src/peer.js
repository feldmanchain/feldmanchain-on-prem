import { protocolIsUnsupported } from "./utility/error-handling.js"
import * as logger from "./utility/log.js"
import * as streamer from "./stream.js"
import { createNode } from "./create-node.js"

streamer.setStdinEncodingToUtf8()

const node = await createNode()

node.on("peer:discovery", async (peerId) => {
  logger.logDiscoveredInfo(peerId)

  try {
    const { stream } = await node.dialProtocol(peerId, "/chat/1.0.0")

    logger.logDialerInfo()

    streamer.stdinToStream(stream)
    streamer.streamToConsole(stream)
  } catch ({ code }) {
    if (protocolIsUnsupported(code)) {
      logger.logUnsupportedProtocol(peerId, "/chat/1.0.0")
    }
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
