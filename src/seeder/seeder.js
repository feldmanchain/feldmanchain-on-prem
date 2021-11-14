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

const peers = new Set()

const server = dgram.createSocket("udp4")

server.on("error", ({ stack }) => {
  console.log(`received message:\n${stack}`)

  server.close()
})

server.on("message", (msg, { address, port }) => {
  const parsedMessage = parseMessage(msg)

  const peer = {
    id: next_index++,
    address,
    port,
  }

  peers.add(peer)

  console.log("server got", parsedMessage, `from ${address}:${port}`)

  const peerAddedMessage = {
    type: "peer_added",
    payload: peer,
  }

  server.send(createMessage(peerAddedMessage), port, address)
})

server.on("listening", () => {
  const { address, port } = server.address()

  console.log(`server listening ${address}:${port}`)

  setInterval(() => {
    for (const peer of peers) {
      const message = createMessage({
        type: "ping",
        payload: { peer },
      })

      server.send(message, peer.port, peer.address, (error) => {
        if (error) {
          console.log("peer", peer.id, "disconnected")
        }
      })
    }
  }, 1000)
})

server.bind(41234)
