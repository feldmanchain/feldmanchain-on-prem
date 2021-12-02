# libp2p Protocol Concept

libp2p supports both built in protocols ("core libp2p protocols") as well as custom defined application protocols. Each protocol should have a unique string id, which is constructed as a path: `/my-app/amazing-protocol/1.0.1`. By convention, a protocol id should end with a version number, which makes it easy to implement version control. The built in protocols in libp2p are:

| Name              | Protocol                      |
| :---------------- | :---------------------------- |
| **ping**          | `/ipfs/ping/1.0.0`            |
| **identify**      | `/ipfs/identify/1.0.0`        |
| **identify/push** | `/ipfs/identify/push/1.0.0`   |
| **secio**         | `/secio/1.0.0`                |
| **kad-dht**       | `/ipfs/kad/1.0.0`             |
| **Circuit Relay** | `/libp2p/circuit/relay/0.1.0` |

There are some inconsistencies in the naming convention and version numbers of the protocols, which I believe to be a side effect of libp2p originally being derived from ipfs.

## Handler functions

To listen to a protocol, you set up a handler for the specific protocol id. The handler is then invoked every time an incoming stream is tagged with the protocol id (handled by the transport switch). A match function can be used to accept non-exact string matches for example to match on semantic major versions.

## Protocol Negotiation

When dialing out to initiate a new stream, the protocol id is sent. The receiving (listening) peer checks this against registered handlers, and if a match is found the peer will echo the protocol id the back to the dialer. If the protocol is not supported by the listener, the stream is ended.

You can provide multiple protocol ids when dialing out. They will then be tried in succession, and the first successful match will be used if at least one of the protocols is supported by the remote peer.

## Binary streams and Protocol Buffers

libp2p sends data over a bi-directional binary stream with the following properties ([as copied from here](https://docs.libp2p.io/concepts/protocols/#binary-streams)):

- Bidirectional, reliable delivery of binary data
  - Each side can read and write from the stream at any time
  - Data is read in the same order as it was written
  - Can be “half-closed”, that is, closed for writing and open for reading, or closed for reading and open for writing
- Supports backpressure
  - Readers can’t be flooded by eager writers

On top of this, these streams are both secure and multiplexed, which is opaquely handled by libp2p. You can send data over a protocol stream in any format and structure you want, but the built in protocols transmit data as protocol buffers (protobufs), which is somewhat recommended. Messages are sent as binary data, prefixed with an integer (encoded as a protobuf varint) that represents the length of the payload in bytes.

## Built in Protocols

As previously mentioned, there are a couple of built in protocols in libp2p.

### Ping

> a simple liveness check that peers can use to quickly see if another peer is online.

### Identify

> allows peers to exchange information about each other, most notably their public keys and known network addresses.

### identify/push

> sends the same Identify message as `Identify`, but it does so proactively instead of in response to a request.

### secio (secure input/output)

> a protocol for encrypted communication that is similar to TLS 1.2, but without the Certificate Authority requirements.

### kad-dht

> a Distributed Hash Table based on the Kademlia routing algorithm, with some modifications. Used as the foundation for peer and content routing.

### Circuit Relay

> a protocol for tunneling traffic through relay peers when two peers are unable to connect to each other directly.
