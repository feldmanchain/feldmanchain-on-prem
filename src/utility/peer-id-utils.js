/*
  NOTE(Alan):

  Functionality related to generating and loading peer ids,
  used to enable consistent peer ids across runs.

  {loadPeerId} is the only public-facing function of this file.
  
  If invoked with a {peerName}, that file will be (created and) loaded,
  else, the first available peer id file will be (created and) loaded.
*/

import fs from "fs"
import path from "path"
import PeerId from "peer-id"

const peerIdsFolder = path.resolve(process.cwd(), "peer-ids")

const createPeerIdAndSaveToFile = async (peerName) => {
  const peerId = await PeerId.create()

  const fileName = `${peerName || peerId.toB58String()}.json`
  const filePath = path.join(peerIdsFolder, fileName)

  const peerIdJsonContents = JSON.stringify(peerId.toJSON(), null, 4)

  fs.writeFileSync(filePath, peerIdJsonContents, { encoding: "utf8" })
}

const getFilename = (peerName) => {
  if (peerName) {
    return `${peerName}.json`
  }

  const [file] = fs.readdirSync(peerIdsFolder, { encoding: "utf8" })

  return file || null
}

const readPeerIdFromFile = async (peerName) => {
  const filename = getFilename(peerName)

  if (!filename) {
    return null
  }

  const filePath = path.join(peerIdsFolder, filename)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, { encoding: "utf8" })

  const peerIdJson = JSON.parse(fileContents)
  const peerId = await PeerId.createFromJSON(peerIdJson)

  return peerId
}

const loadPeerId = async (peerName) => {
  if (peerName) {
    peerName = path.parse(peerName).name
  }

  let peerId = await readPeerIdFromFile(peerName)

  if (peerId) {
    return peerId
  }

  await createPeerIdAndSaveToFile(peerName)

  peerId = await readPeerIdFromFile(peerName)

  return peerId
}

export { loadPeerId }
