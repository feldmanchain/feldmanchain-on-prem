/*
  NOTE(Alan): The set of connected peers and associated utility functions
*/

const peers = []
const availableIndexes = []

const getIncomingPeers = (index) => {
  const incomingPeers = []

  let i = 1
  while (true) {
    index -= i

    if (index < 0) break

    if (index >= peers.length) continue

    const incomingPeer = peers[index]

    if (incomingPeer !== null) {
      incomingPeers.push(incomingPeer)
    }

    i *= 2
  }

  return incomingPeers
}

const addPeer = (address, port) => {
  const id = availableIndexes.shift() || peers.length
  const incomingPeers = getIncomingPeers(id)

  const peer = {
    id,
    incomingPeers,
    address,
    port,
  }

  if (id < availableIndexes.length - 1) {
    peers[id] = peer
  } else {
    peers.push(peer)
  }

  return peer
}

const removePeer = (index) => {
  if (index >= peers.length) {
    return
  }

  peers[index] = null
  availableIndexes.push(index)
}

export { addPeer, removePeer }
