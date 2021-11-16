/*
  NOTE(Alan): Seeds cold peers with peers

  TODO(Alan):
    1. First have client discover each other when possible
    2. Second relay clients to previously connected clients

    * implement this as a kademlia network
    * add meaningful messaging, AKA a way to communicate builds
*/

import dgram from "dgram"
import { createMessage, parseMessage } from "../lib/network-message.js"

let next_index = 0

/*
  NOTE(Alan): does it make sense to have a Set here?

  Maybe an array where the index is the id makes more sense,
  which would allow for faster access time, given a Kademlia implementation
  where a peer's peers are know to be at position n+1, n+2, n+4, n+8, n+16 ...
  (this is a half-truth, but somewhat close enough)
*/
const peers = new Set()

const server = dgram.createSocket("udp4")

server.on("error", ({ stack }) => {
  console.log(`received message:\n${stack}`)

  server.close()
})

const handle_message = (address, port, type, payload) => {
  switch (type) {
    case "add_peer":
      const peer = {
        id: next_index++,
        address,
        port,
      }

      peers.add(peer)

      const peerAddedMessage = createMessage({
        type: "peer_added",
        payload: peer,
      })

      server.send(peerAddedMessage, port, address)

      // TODO(Alan): Also notify "related" peers
      break

    case "heart_beat":
      console.log("peer heart beat:", payload)
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

  console.log(`server listening ${address}:${port}`)
})

server.bind(41234)
