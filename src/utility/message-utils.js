/*
    NOTE (Alan):
    
    Contains utility functions for constructing and parsing messages,

    {createMessage} creates a message to be sent over libp2p pubusb.
    {parseMessage} parses a message received over libp2p pubusb.
*/

import { BuildRequest, handleProtobufError } from "./protobuf-utils.js"

const createMessage = (message) => {
  const err = BuildRequest.verify(message)

  if (err) {
    console.error(err)

    return null
  }

  return BuildRequest.encode(message).finish()
}

const parseMessage = (buffer) => {
  try {
    return BuildRequest.decode(buffer).toJSON()
  } catch (e) {
    return handleProtobufError(e)
  }
}

export { createMessage, parseMessage }
