# libp2p

libp2p is a tech stack for building peer-to-peer networks. To better understand the structure of it, and how to use it effectively, this document will serve as a place to take notes and can hopefully help enlighten us as to how we can use it in feldmanchain.

As a project, it consists of both a specification as well as a set of implementations. You can chose to either use one of the existing implementations or supply your own. As long as it is compatible with the specification, you can expect it to work and be compatible with other parts of the network stack.

## Layers / Concepts

libp2p is build on layers, or concepts as they refer to it in their documentation. The idea behind their project structure is that you can mix and match between different implementations of these concepts to achieve the network stack that suites your needs.

* [Transport Concept](./LIBP2P_CONCEPT_TRANSPORT.md)