import { request_build_topic } from "../constants/topic-constants.js"
import { createMessage, parseMessage } from "../lib/message-utils.js"
import { createLibp2p } from "../lib/create-libp2p.js"
import * as logger from "../lib/log.js"

// TODO(Alan): Make this a class for re-usability

let isAcceptingBuildRequests = false

const requestBuild = (libp2p) => {
  const data = { type: "nodejs", main: "index.js" }

  libp2p.pubsub.publish(request_build_topic, createMessage(data))

  return data
}

const buildRequestListener =
  (cb) =>
  ({ from, data }) => {
    logger.logBuilderSubMessage(from, parseMessage(data))
    cb(from, data)
  }

const startAcceptingBuildRequests = (libp2p, cb) => {
  if (isAcceptingBuildRequests) return

  isAcceptingBuildRequests = true

  libp2p.pubsub.on(request_build_topic, buildRequestListener(cb))
  libp2p.pubsub.subscribe(request_build_topic)
}

const stopAcceptingBuildRequests = (libp2p) => {
  if (!isAcceptingBuildRequests) return

  isAcceptingBuildRequests = false

  libp2p.pubsub.off(
    request_build_topic,
    buildRequestListener((f) => f)
  )
  libp2p.pubsub.unsubscribe(request_build_topic)
}

const stopPeer = async (libp2p) => {
  await libp2p.stop()

  logger.logStoppedMessage()
}

const createPeer = async () => {
  const libp2p = await createLibp2p()

  libp2p.on("peer:discovery", logger.logDiscoveredInfo)

  await libp2p.start()

  logger.logNodeStartedInfo(libp2p)

  return libp2p
}

export {
  createPeer,
  stopPeer,
  requestBuild,
  startAcceptingBuildRequests,
  stopAcceptingBuildRequests,
}
