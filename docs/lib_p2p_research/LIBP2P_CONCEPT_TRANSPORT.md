# libp2p Transport Concept

The first, and most fundamental, layer of the libp2p stack is the transport layer. This layer handles the connection as well as the actual data transfer between peers. libp2p is "transport agnostic", which means that the decision of what protocol to use is up to you, the developer. Available implementations include TCP/IP, UDP, QUIC and more.

## Listening and Dialing

Transports are defined in terms of two core operations, **listening** and **dialing**.

Listening means that a peer can accept incoming messages and dialing means that a peer can open an outgoing connection to a listening peer. The actual connection and data transmission is handled by the transport layer, depending on the OS/environment it is run on.

If no listening address is provided when creating the node, it will become what is known as a "dial only" peer, which is a peer that can only establish outgoing connections.

## Addresses

For a peer to connect to another peer, it needs to know the address of it. The actual address itself can be dependent on the transport protocol, which is why libp2p uses a convention they call "multiaddress" (or `multiaddr`).

Both dial and listen uses a multiaddress. When dialing the address should include something called a peer id of the peer you are dialing. This enables libp2p to establish a secure communication channel to it.

## Multiaddr

A `multiaddr` is built up of several parts, and aims to be a future proof human and machine readable representation of an address including protocol, IP, peer id and more. For example, the multiaddr `/ip4/1.2.3.4/tcp/4321/p2p/QmcEPrat8ShnCph8WjkREzt5CPXF2RwhYxYBALDcLC1iV6` is made up of the parts:

| Key                   | Value                                          |
| :-------------------- | :--------------------------------------------- |
| Protocol              | IPv4                                           |
| IP                    | 1.2.3.4                                        |
| Transmission Protocol | TCP                                            |
| Port                  | 4321                                           |
| Protocol Id           | p2p (libp2p)                                   |
| p2p Peer Id           | QmcEPrat8ShnCph8WjkREzt5CPXF2RwhYxYBALDcLC1iV6 |

This information is enough for the libp2p transport layer to establish connections and communication channels. Since more than one protocol can be used at the same time, many protocols can be represented within the same multiaddress, such as `/ip4/127.0.0.1/udp/1234`.

## Peer Identities

Every peer in libp2p has a PeerId which is a private and corresponding cryptographic public key that is used to identify the peer as well as verifying its identity when performing tasks such as establishing secure channels. PeerIds are so called multihashes, which is a hash that has a two byte header that identifies the hash function used and the output length in bytes. Multihashes can be used to identify anything unique on the network, such as content. A PeerId is a multihash of 256 bits (a SHA-256 hash) with a base58 encoding, identified by the header `Qm`.

## Peer routing

Peer routing is the process of discovering the address of a peer in the network. This can be done by different methods, such as a Kademlia DHT or multicast DNS (mdns). This is not the same as identifying a peer, since you first need to use some method of discovery before you can identify it. In general, there are two categories of discovery mechanics, which are suitable depending on the preconditions of the peer joining the network: `ambient` and `active` discovery. In short, ambient discovery allows a peer to discover peers outside of libp2p using mdns, bootstrap, bluetooth etc, and active discovery lets you discover peers within a libp2p network using DHTs or rendezvous servers.

## Switches

libp2p transports includes the concept of a switch (formerly known as a swarm) which handles things such as multiplexing, protocol upgrading and protocol negotiation.
