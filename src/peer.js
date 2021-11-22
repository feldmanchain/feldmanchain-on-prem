import Libp2p from "libp2p"
import TCP from "libp2p-tcp"
import { NOISE } from "libp2p-noise"
import MPlex from "libp2p-mplex"
import MulticastDNS from "libp2p-mdns"
import {
  logDiscoveredInfo,
  logDialerInfo,
  logNodeStartedInfo,
} from "./utility/log.js"
import { stdinToStream, streamToConsole } from "./stream.js"

const createNode = async () => {
  const node = await Libp2p.create({
    addresses: {
      listen: ["/ip4/0.0.0.0/tcp/0"],
    },
    modules: {
      transport: [TCP],
      streamMuxer: [MPlex],
      connEncryption: [NOISE],
      peerDiscovery: [MulticastDNS],
    },
    config: {
      peerDiscovery: {
        [MulticastDNS.tag]: {
          interval: 20e3,
          enabled: true,
        },
      },
    },
  })

  return node
}

const node = await createNode()

node.on("peer:discovery", async (peerId) => {
  logDiscoveredInfo(peerId)

  const { stream } = await node.dialProtocol(peerId, "/chat/1.0.0")

  logDialerInfo()

  stdinToStream(stream)
  streamToConsole(stream)
})

await node.handle("/chat/1.0.0", async ({ stream }) => {
  stdinToStream(stream)
  streamToConsole(stream)
})

await node.start()

logNodeStartedInfo(node)

const stop = async () => {
  await node.stop()

  console.log("libp2p has stopped")
  process.exit(0)
}

process.on("SIGTERM", stop)
process.on("SIGINT", stop)
