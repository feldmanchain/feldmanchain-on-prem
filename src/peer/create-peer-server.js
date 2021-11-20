import dgram from "dgram"
import { parseMessage, createMessageSender } from "../lib/network-message.js"
import { peer } from "./peer.js"

const createPeerServer = (seederAddress, seederPort, onMessage) => {
  const server = dgram.createSocket("udp4")

  server.on("message", (msg, { address, port }) => {
    const { type, payload } = parseMessage(msg)

    onMessage(server, address, port, type, payload)
  })

  const sendToSeeder = createMessageSender(server, seederPort, seederAddress)

  server.on("listening", () => {
    console.log("peer connected")

    sendToSeeder({
      type: "seed_peer",
      payload: peer,
    })
  })

  server.bind() // NOTE(Alan): Let the OS specify the port

  return server
}

export { createPeerServer }
