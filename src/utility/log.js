/*
  NOTE(Alan):

  Utility functions for logging information.

  Can be silenced with the -q option: npm start -- -q
*/

import { quiet } from "./cli-options.js"

const log = quiet ? () => {} : console.log

const logDiscoveredInfo = (peerId) => {
  log("Discovered:", peerId.toB58String())
  log("\n")
}

const logDialerInfo = () => {
  log("Dialer dialed to listener on protocol: /chat/1.0.0")
  log("Type a message and see what happens")
  log("\n")
}

const logNodeStartedInfo = (node) => {
  log("Listener ready, listening on:")

  node.multiaddrs.forEach((ma) => {
    log(`${ma.toString()}/p2p/${node.peerId.toB58String()}`)
  })

  log("\n")
}

const logUnsupportedProtocol = (peerId, protocol) => {
  log(
    "The peer",
    peerId.toB58String(),
    "does not support the protocol",
    protocol
  )
  log("\n")
}

const logStoppedMessage = () => {
  log("libp2p has stopped")
  log("\n")
}

const logBuilderSubMessage = (from, data) => {
  log("INCOMING BUILD REQUEST\nfrom:", from, "data:", data)
  log("\n")
}

export {
  logDiscoveredInfo,
  logDialerInfo,
  logNodeStartedInfo,
  logUnsupportedProtocol,
  logStoppedMessage,
  logBuilderSubMessage,
}
