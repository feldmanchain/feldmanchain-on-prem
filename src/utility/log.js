const logDiscoveredInfo = (peerId) => {
  console.log("Discovered:", peerId.toB58String())
  console.log("\n")
}

const logDialerInfo = () => {
  console.log("Dialer dialed to listener on protocol: /chat/1.0.0")
  console.log("Type a message and see what happens")
  console.log("\n")
}

const logNodeStartedInfo = (node) => {
  console.log("Listener ready, listening on:")

  node.multiaddrs.forEach((ma) => {
    console.log(`${ma.toString()}/p2p/${node.peerId.toB58String()}`)
  })

  console.log("\n")
}

const logUnsupportedProtocol = (peerId, protocol) => {
  console.log(
    "The peer",
    peerId.toB58String(),
    "does not support the protocol",
    protocol
  )
  console.log("\n")
}

const logStoppedMessage = () => {
  console.log("libp2p has stopped")
}

export {
  logDiscoveredInfo,
  logDialerInfo,
  logNodeStartedInfo,
  logUnsupportedProtocol,
  logStoppedMessage,
}
