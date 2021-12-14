/*
    NOTE (Alan):
    
    Contains utility functions for constructing and parsing messages,

    {createMessage} creates a message to be sent over libp2p pubusb.

    {parseMessage} parses a message received over libp2p pubusb.
*/

import {
  fromString as uInt8ArrayFromString,
  toString as stringFromUint8Array,
} from "uint8arrays"

const createMessage = (data) => {
  // NOTE(Alan): assumes data can be stringified (which is most of the JS intrinsic types)
  const jsonString = JSON.stringify(data)
  const buffer = uInt8ArrayFromString(jsonString)

  return buffer
}

const parseMessage = (message) => {
  const jsonString = stringFromUint8Array(message)
  const data = JSON.parse(jsonString)

  return data
}

export { createMessage, parseMessage }
