# NAT Traversal Concept

Since the IPv4 has a 32-bit address space, there is a limited (~4.000.000) number of public IPv4 addresses. To be able to include a higher number of connected devices than that, the internet is composed of a lot of smaller subnets. Each machine in a subnet has its own local address, but the subnet itself is exposed to the shared address space via one single public address. When traffic moves between the shared address space and a subnet's local address space, something called Network Address Translation (NAT) occurs; this is the process of mapping an address from one address space to another.

For example, a computer might have a local address of `10.0.1.15` and a local router might handle the translation between address spaces of outgoing and incoming traffic. Pertaining to incoming traffic, the router might require some configuration since it only has one public address to receive data on. In this case, it is a common practice to have it map between public and internal ports. To handle cases such as dynamic IP and ports, libp2p strives to handle this mapping automatically.

## Automatic router configuration

Some routers support automatic port forwarding, and while libp2p by extension also does support this, it seems like implementations for this only exists for golang, and that one is experimental.

## Hole-Punching (STUN)

When a machine in a subnet dials out to the public net, the router will map a public port to the internal address which can be used for outgoing, and in some cases for incoming, traffic. This information is unfortunately hidden from the dialing peer, but receiving peers can observe the port of the incoming message and relay it back to the dialing peer. The dialing peer can then pass this information to other peers in the network through a procedure called peer-routing. In libp2p, the built-in protocol `identify` does just this - when a peer is being identified, it includes information about the observed addresses of the asking peer in the response. The relation between discovery and identification is such that you first must discover a peer using an appropriate strategy before you can identify it. See [this](./LIBP2P_CONCEPT_TRANSPORT.md#peer-routing) for more info on discovery.

## AutoNAT

libp2p supports an additional protocol called AutoNAT that allows for peer address identification in the case where peers doest _not_ accept incoming traffic on the same port as outgoing traffic. This is only implemented within golang though.

## Circuit Relay (TURN)

In cases where NAT cannot be used, libp2p implements something called circuit relay which uses intermediary peers to find other peers.