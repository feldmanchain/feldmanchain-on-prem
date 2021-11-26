import Libp2p from "libp2p"
import TCP from "libp2p-tcp"
import MPlex from "libp2p-mplex"
import MulticastDNS from "libp2p-mdns"
import { NOISE } from "@chainsafe/libp2p-noise"
import { peerName } from "./utility/cli-options.js"
import { getPeerId } from "./utility/peer-id-utils.js"

const createNode = async () => {
  const peerId = await getPeerId(peerName)

  const node = await Libp2p.create({
    peerId,
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

export { createNode }
