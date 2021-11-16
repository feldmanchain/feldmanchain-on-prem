/*
  NOTE(Alan):

  These functions create and parses a message that can be sent as a datagram over the UDP network.

  The usage of JSON.stringify and JSON.parse should be considered safe,
  because it handles both objects, arrays and strings seamlessly.

  The expected anatomy of a message is an object with the two properties "type" and "payload".
*/

const createMessage = (data) => {
  const string = JSON.stringify(data)
  const buffer = Buffer.from(string, "binary")

  return buffer
}

const parseMessage = (message) => {
  const binary = Buffer.from(message, "binary")
  const json = JSON.parse(binary)

  return json
}

// NOTE(Alan): "binds" a server.send function to a fixed server and optionally a fixed port and address
const createMessageSender =
  (server, defaultPort, defaultAddress) => (message, port, address) => {
    server.send(
      createMessage(message),
      Number.parseInt(defaultPort || port),
      defaultAddress || address
    )
  }

export { createMessage, parseMessage, createMessageSender }
