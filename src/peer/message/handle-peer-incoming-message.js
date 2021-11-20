import { onOutgoingPeerAdded } from "./on-outgoing-peer-added.js"
import { onAddOutgoingPeer } from "./on-add-outgoing-peer.js"
import { onPeerSeeded } from "./on-peer-seeded.js"

const handlePeerIncomingMessage = (server, address, port, type, payload) => {
  switch (type) {
    case "peer_seeded":
      onPeerSeeded(server, payload)

      break

    // TODO(Alan): add case for looking up incoming peers

    case "add_outgoing_peer":
      onAddOutgoingPeer(server, payload)

      break

    case "outgoing_peer_added":
      onOutgoingPeerAdded(server, payload)

      break
    default:
      break
  }
}

export { handlePeerIncomingMessage }
