import { createMessageSender } from "../../lib/network-message.js"
import { peer } from "../peer.js"

const onAddOutgoingPeer = (server, payload) => {
  console.log("add outgoing peer", payload.id)

  if (!peer.outgoingPeers.some((p) => p.id === payload.id)) {
    peer.outgoingPeers.push(payload)
    peer.outgoingPeers = peer.outgoingPeers.sort((a, b) => a.id - b.id)
  }

  const send = createMessageSender(server, payload.port, payload.address)

  send({
    type: "outgoing_peer_added",
    payload: peer,
  })
}

export { onAddOutgoingPeer }
