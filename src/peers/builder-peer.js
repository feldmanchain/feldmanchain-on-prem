import { toString as stringFromUInt8Array } from "uint8arrays"
import { request_build_topic } from "../constants/topic-constants.js"
/*
  NOTE(Alan):

  Allows for the creation of a builder peer, used for accepting build requests.
  
  The static factory function {create} can be used to instantiate a
  new builder peer, which will automatically subscribe to build request
  that are sent over libp2p's pubsub network.
*/

import * as logger from "../utility/log.js"
import { createNode } from "../create-node.js"

class BuilderPeer {
  #node

  stop = async () => {
    await this.#node.stop()

    logger.logStoppedMessage()
  }

  static create = async () => {
    const peer = new BuilderPeer()

    peer.#node = await createNode()

    peer.#node.on("peer:discovery", logger.logDiscoveredInfo)

    await peer.#node.start()

    peer.#node.pubsub.on(request_build_topic, (msg) => {
      logger.logBuilderSubMessage(
        msg.from,
        stringFromUInt8Array(msg.data) // TODO(Alan): JSON parse proper metadata
      )
    })

    peer.#node.pubsub.subscribe(request_build_topic)

    return peer
  }
}

export { BuilderPeer }
