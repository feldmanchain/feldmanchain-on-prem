import dgram from "dgram"
import {
  capabilities,
  seederAddress,
  seederPort,
} from "./peer-cli-arguments.js"
import { createMessage, parseMessage } from "../lib/network-message.js"

const peer = {
  seederAddress,
  seederPort,
  capabilities,
}

console.log(peer)

const server = dgram.createSocket("udp4")

server.on("message", (msg, { address, port }) => {
  const parsedMessage = parseMessage(msg)

  console.log("received message", parsedMessage, `from ${address}:${port}`)
})

server.connect(Number.parseInt(seederPort), seederAddress, () => {
  console.log("peer connected")

  const initializeMessage = {
    type: "initialize",
    payload: peer,
  }

  console.log(Number.parseInt(seederPort))

  server.send(createMessage(initializeMessage), Number.parseInt(seederPort)) // JSON.stringify(initializeMessage))
})

// const peers = {}

// const addPeer = (key, value) => {
//   peers[key] = value
// }

// const createPeer = (id) => ({
//   id,
//   ip: "127.0.0.1",
// })

// export { createPeer }
