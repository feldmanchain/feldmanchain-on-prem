/*
  NOTE(Alan):

  Allows for the creation of a client peer used for making build requests.
  
  The static factory function {create} can be used to instantiate a
  new client peer, which can then be use to publish build requests
  over libp2p's pubsub network.
*/

import { fromString as uInt8ArrayFromString } from "uint8arrays"
import { request_build_topic } from "../constants/topic-constants.js"
import * as logger from "../utility/log.js"
import { createNode } from "../create-node.js"

class ClientPeer {
  #node

  requestBuild = () => {
    this.#node.pubsub.publish(
      request_build_topic,
      uInt8ArrayFromString("{ type: nodejs, main: index.js }") // TODO(Alan): JSON stringify proper metadata
    )
  }

  stop = async () => {
    await this.#node.stop()

    logger.logStoppedMessage()
  }

  static create = async () => {
    const peer = new ClientPeer()

    peer.#node = await createNode()

    peer.#node.on("peer:discovery", logger.logDiscoveredInfo)

    await peer.#node.start()

    return peer
  }
}

export { ClientPeer }
