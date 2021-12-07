/*
  NOTE(Alan):

  Allows for the creation of a client peer used for making build requests.
  
  The static factory function {create} can be used to instantiate a
  new client peer, which can then be use to publish build requests
  over libp2p's pubsub network.
*/

import { request_build_topic } from "../constants/topic-constants.js"
import { ProjectTypes } from "../utility/protobuf-utils.js"
import { createMessage } from "../utility/message-utils.js"
import * as logger from "../utility/log.js"
import { createNode } from "../create-node.js"

class ClientPeer {
  #node

  requestBuild = () => {
    const message = createMessage({
      type: ProjectTypes.NODE_JS,
      main: "index.js",
    })

    if (message) {
      this.#node.pubsub.publish(request_build_topic, message)
    }
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

    logger.logNodeStartedInfo(peer.#node)

    return peer
  }
}

export { ClientPeer }
