/*
  NOTE(Alan): The set of connected peers and associated utility functions
*/

const peers = []
const availableIndexes = []

const addPeer = (address, port) => {
  const id = availableIndexes.shift() || peers.length

  const peer = {
    id,
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
