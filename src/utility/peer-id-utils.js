/*
  NOTE(Alan):

  This file contains functionality related to generating and fetching peer ids for the running node. 

  TODO: Refactor this for readability
*/

import fs from "fs"
import path from "path"
import PeerId from "peer-id"

const peerIdsFolder = path.resolve(process.cwd(), "peer-ids")

const createPeerIdAndSaveToFile = async (peerIdFilename) => {
  const peerId = await PeerId.create()

  const fileName = peerIdFilename || peerId.toB58String()
  const filePath = path.join(peerIdsFolder, `${fileName}.json`)

  const peerIdJsonContents = JSON.stringify(peerId.toJSON(), null, 4)

  fs.writeFileSync(filePath, peerIdJsonContents, { encoding: "utf8" })
}

const getPeerIdByFilename = async (peerIdFilename) => {
  const filePath = path.join(peerIdsFolder, peerIdFilename)
  const fileContents = fs.readFileSync(filePath, { encoding: "utf8" })

  const peerIdJson = JSON.parse(fileContents)
  const peerId = await PeerId.createFromJSON(peerIdJson)

  return peerId
}

const getFirstAvailablePeerId = async (peerIdFilename) => {
  if (peerIdFilename) {
    if (!fs.existsSync(path.join(peerIdsFolder, `${peerIdFilename}.json`))) {
      return null
    }

    return await getPeerIdByFilename(`${peerIdFilename}.json`)
  }

  const files = fs.readdirSync(peerIdsFolder)

  if (files.length <= 0) {
    return null
  }

  return await getPeerIdByFilename(files[0])
}

const getPeerId = async (peerIdFilename) => {
  let peerId = await getFirstAvailablePeerId(peerIdFilename)

  if (peerId === null) {
    await createPeerIdAndSaveToFile(peerIdFilename)

    peerId = await getFirstAvailablePeerId(peerIdFilename)
  }

  return peerId
}

export { getPeerId }
