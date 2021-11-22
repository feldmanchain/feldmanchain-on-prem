import Libp2p from "libp2p"
import TCP from "libp2p-tcp"
import { NOISE } from "libp2p-noise"
import MPlex from "libp2p-mplex"
import MulticastDNS from "libp2p-mdns"

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

// TODO(Alan): how to listen to messages?

let pingIntervalHandle = null

node.on("peer:discovery", async (peerId) => {
  console.log("Discovered:", peerId.toB58String())

  pingIntervalHandle = setInterval(async () => {
    const ms = await node.ping(peerId)

    console.log("pinged", peerId.toB58String(), "in", ms, "ms")
  }, 5000) // ping every 5 secs
})

await node.start()

const stop = async () => {
  if (pingIntervalHandle) {
    clearInterval(pingIntervalHandle)
    pingIntervalHandle = null
  }

  // stop libp2p
  await node.stop()

  console.log("libp2p has stopped")

  process.exit(0)
}

process.on("SIGTERM", stop)
process.on("SIGINT", stop)
