import Libp2p from "libp2p"
import TCP from "libp2p-tcp"
import MPlex from "libp2p-mplex"
import MulticastDNS from "libp2p-mdns"
import { NOISE } from "@chainsafe/libp2p-noise"
import {
  logDiscoveredInfo,
  logDialerInfo,
  logNodeStartedInfo,
} from "./utility/log.js"
import {
  setStdinEncodingToUtf8,
  stdinToStream,
  streamToConsole,
} from "./stream.js"

setStdinEncodingToUtf8()

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

  // var peerIds = Array.from(node.peerStore.peers, ([_, p]) => p.id.toB58String())

  // console.log(peerIds)
  logDialerInfo()

  stdinToStream(stream)
  streamToConsole(stream)
})

node.on("peer:disconnect", async (peerId) => {
  console.log("disconnect", peerId.toB58String())
})

node.on("peer:disconnected", async (peerId) => {
  console.log("disconnected", peerId.toB58String())
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
