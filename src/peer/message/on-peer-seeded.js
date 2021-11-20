import { createMessageSender } from "../../lib/network-message.js"
import { peer } from "../peer.js"

const onPeerSeeded = (server, payload) => {
  console.log("peer seeded", payload.id)
  
  peer.id = payload.id
  peer.address = payload.address
  peer.port = payload.port
  peer.incomingPeers = payload.incomingPeers

  for (const incomingPeer of peer.incomingPeers) {
    const send = createMessageSender(
      server,
      incomingPeer.port,
      incomingPeer.address
    )

    send({
      type: "add_outgoing_peer",
      payload: peer
    })
  }
}

export { onPeerSeeded }
