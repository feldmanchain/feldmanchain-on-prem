/*
    NOTE (Alan):
    
    Thin abstraction of protobuf loading and functions
*/

import path from "path"
import protobuf from "protobufjs"

const templatePath = path.join(
  process.cwd(),
  "message-templates",
  "build-request.proto"
)

// TODO(Alan): Add error handling (try..catch) missing types, maybe use TS

const root = await protobuf.load(templatePath)
const BuildRequest = root.lookupType("transport.BuildRequest")
const ProjectTypes = BuildRequest.lookupEnum("Type").values

const handleProtobufError = (e) => {
  if (e instanceof protobuf.util.ProtocolError) {
    // e.instance holds the so far decoded message with missing required fields
    // TODO(Alan): Find out the correct way to handle this situation
    console.error("missing required fields in protobuf message")

    return null
  } else {
    console.error("invalid protobuf message", e.Message)
    return null
  }
}

export { BuildRequest, ProjectTypes, handleProtobufError }
