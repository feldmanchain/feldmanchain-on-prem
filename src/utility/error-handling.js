const ERR_UNSUPPORTED_PROTOCOL = "ERR_UNSUPPORTED_PROTOCOL"

const protocolIsUnsupported = (code) => {
  return code === ERR_UNSUPPORTED_PROTOCOL
}

export { protocolIsUnsupported }
