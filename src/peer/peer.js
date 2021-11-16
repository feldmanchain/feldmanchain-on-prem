/*
  NOTE (Alan):

  A peer is the least common denominator on the network,
  and can be either one or many of a user, an auctioneer or a builder
*/

import dgram from "dgram"
import * as cliOptions from "./peer-cli-options.js"
import { createMessageSender, parseMessage } from "../lib/network-message.js"

const { capabilities, seederAddress, seederPort } = cliOptions

const peer = {
  capabilities,
}

const server = dgram.createSocket("udp4")

const handle_message = (address, port, type, payload) => {
  switch (type) {
    case "peer_added":
      peer.id = payload.id
      peer.address = payload.address
      peer.port = payload.port

      console.log("peer added:", peer)

      break

    default:
      break
  }
}

server.on("message", (msg, { address, port }) => {
  const { type, payload } = parseMessage(msg)

  handle_message(address, port, type, payload)
})

const sendToSeeder = createMessageSender(server, seederPort, seederAddress)

server.on("listening", () => {
  console.log("peer connected")

  sendToSeeder({
    type: "add_peer",
    payload: peer,
  })

  setInterval(() => {
    sendToSeeder({
      type: "heart_beat",
      payload: peer,
    })
  }, 1000 * 60) // NOTE(Alan): inform the seeder that we are alive once every minute
})

server.bind() // NOTE(Alan): Let the OS specify the port
