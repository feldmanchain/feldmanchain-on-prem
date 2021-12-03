/*
  NOTE(Alan):

  {createNode} creates a generic libp2p node (peer).

  The least common denominator meant to be used by higher abstraction peers,
  this function is of itself a thin abstraction over libp2p and should only
  handle things such as setting up modules, addresses etc.
*/

import Libp2p from "libp2p"
import TCP from "libp2p-tcp"
import Mplex from "libp2p-mplex"
import MulticastDNS from "libp2p-mdns"
import Gossipsub from "libp2p-gossipsub"
import { NOISE } from "@chainsafe/libp2p-noise"
import { peerName } from "./utility/cli-options.js"
import { loadPeerId } from "./utility/peer-id-utils.js"

const createNode = async () => {
  const peerId = await loadPeerId(peerName)

  const node = await Libp2p.create({
    peerId,
    addresses: {
      listen: ["/ip4/0.0.0.0/tcp/0"],
    },
    modules: {
      transport: [TCP],
      streamMuxer: [Mplex],
      connEncryption: [NOISE],
      peerDiscovery: [MulticastDNS],
      pubsub: Gossipsub,
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
