/*
  NOTE (Alan):

  A peer is the least common denominator on the network,
  and can be either one or many of a user, an auctioneer or a builder
*/

import dgram from "dgram"
import * as cliOptions from "./peer-cli-options.js"
import { createMessage, parseMessage } from "../lib/network-message.js"

const { capabilities, seederAddress, seederPort } = cliOptions

const peer = {
  capabilities,
}

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

  server.send(createMessage(initializeMessage), Number.parseInt(seederPort)) // JSON.stringify(initializeMessage))
})
