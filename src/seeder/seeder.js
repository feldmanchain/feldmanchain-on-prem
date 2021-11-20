/*
  NOTE(Alan): Seeds a cold peer with other peers

  TODO(Alan):
    1. First have client discover each other when possible
    2. Second relay clients to previously connected clients

    * implement this as a kademlia network
    * add meaningful messaging, AKA a way to communicate builds
*/

import dgram from "dgram"
import { createMessage, parseMessage } from "../lib/network-message.js"
import { addPeer, removePeer } from "./seeder-peers.js"

const server = dgram.createSocket("udp4")

server.on("error", ({ stack }) => {
  console.log("error", stack)

  server.close()
})

const handle_message = (address, port, type, payload) => {
  switch (type) {
    case "seed_peer":
      const peer = addPeer(address, port)

      console.log("peer added:", peer.id)

      const peerAddedMessage = createMessage({
        type: "peer_seeded",
        payload: peer,
      })

      server.send(peerAddedMessage, port, address)

      break

    case "remove_peer":
      const { id } = payload

      removePeer(id)

      console.log("peer removed:", id)

      // TODO(Alan): Also notify "related" peers
      break

    default:
      break
  }
}

server.on("message", (msg, { address, port }) => {
  const { type, payload } = parseMessage(msg)

  handle_message(address, port, type, payload)
})

server.on("listening", () => {
  const { address, port } = server.address()

  console.log("seeder listening", address, port)
})

server.bind(41234)
