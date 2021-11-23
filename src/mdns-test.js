import MulticastDNS from "libp2p-mdns"
import { Multiaddr } from "multiaddr"
import PeerId from "peer-id"
import { logNodeStartedInfo } from "./utility/log.js"

const peerId = await PeerId.create()

const mdns = new MulticastDNS({
  peerId,
  libp2p: {
    multiaddrs: new Multiaddr("/ip4/0.0.0.0/tcp/0"),
  },
  broadcast: false, // do not talk to ourself
  port: 50001,
  compat: false,
})

mdns.start()

console.log("mdns started on", mdns.peerMultiaddrs, "with port", mdns.port)

const stop = async () => {
  await mdns.stop()

  console.log("MDNS test node has stopped")
  process.exit(0)
}

process.on("SIGTERM", stop)
process.on("SIGINT", stop)
