/*
  NOTE (Alan):

  A peer is the least common denominator on the network,
  and can be either one or many of a user, an auctioneer or a builder
*/

import * as cliOptions from "./peer-cli-options.js"

import { handlePeerIncomingMessage } from "./message/handle-peer-incoming-message.js"
import { createPeerServer } from "./create-peer-server.js"
import { peer } from "./peer.js"

peer.capabilities = cliOptions.capabilities

createPeerServer(
  cliOptions.seederAddress,
  cliOptions.seederPort,
  handlePeerIncomingMessage
)
